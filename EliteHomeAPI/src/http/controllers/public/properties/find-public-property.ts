import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { FindPublicPropertyUseCase } from "../../../../useCases/find-public-property";

export const findPublicProperty = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const params = paramsSchema.parse(request.params);

  const repository = new PropertiesRepository();

  const useCase = new FindPublicPropertyUseCase(repository);

  const response = await useCase.execute(params.id);

  reply.status(200).send(response);
};
