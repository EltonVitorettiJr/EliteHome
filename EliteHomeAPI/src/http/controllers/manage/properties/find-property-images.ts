import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertyImagesRepository } from "../../../../database/repositories/image";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { FindPropertyImagesUseCase } from "../../../../useCases/find-property-images";

export const findPropertyImages = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    propertyId: z.uuid(),
  });

  const params = paramsSchema.parse(request.params);

  const propertiesRepository = new PropertiesRepository();
  const propertyImagesRepository = new PropertyImagesRepository();

  const useCase = new FindPropertyImagesUseCase(
    propertiesRepository,
    propertyImagesRepository,
  );

  const response = await useCase.execute(params.propertyId);

  reply.status(200).send(response);
};
