import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertyImagesRepository } from "../../../../database/repositories/image";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { S3StorageProvider } from "../../../../providers/implementations/s3-storage-provider";
import { DeletePropertyImageUseCase } from "../../../../useCases/delete-property-image";

export const deletePropertyImage = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    propertyId: z.uuid().nonoptional(),
    imageId: z.uuid().nonoptional(),
  });

  const params = paramsSchema.parse(request.params);

  const propertiesRepository = new PropertiesRepository();
  const propertyImageRepository = new PropertyImagesRepository();
  const storageProvider = new S3StorageProvider();

  const useCase = new DeletePropertyImageUseCase(
    propertyImageRepository,
    storageProvider,
    propertiesRepository,
  );

  const response = await useCase.execute(params.propertyId, params.imageId);

  reply.status(200).send(response);
};
