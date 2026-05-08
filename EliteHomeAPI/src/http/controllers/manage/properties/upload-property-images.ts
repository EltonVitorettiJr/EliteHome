import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertyImagesRepository } from "../../../../database/repositories/image";
import { LocalStorageProvider } from "../../../../providers/implementations/local-storage-provider";
import { UploadPropertyImagesUseCase } from "../../../../useCases/upload-property-images";

export const uploadPropertyImages = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const params = paramsSchema.parse(request.params);

  const parts = request.parts();
  const filesToUpload = [];

  for await (const part of parts) {
    if (part.type === "file") {
      const fileBuffer = await part.toBuffer();

      filesToUpload.push({
        fileName: part.filename,
        fileBuffer,
      });
    }
  }

  if (filesToUpload.length === 0) {
    return reply.status(400).send({ error: "No files uploaded." });
  }

  const storageProvider = new LocalStorageProvider();
  const imagesRepository = new PropertyImagesRepository();
  const useCase = new UploadPropertyImagesUseCase(
    imagesRepository,
    storageProvider,
  );

  const response = await useCase.execute({
    propertyId: params.id,
    files: filesToUpload,
  });

  return reply.status(201).send(response);
};
