import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { FindPropertyByIdUseCase } from "../../../../useCases/find-property";

export const findById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const schema = z.object({
    propertyId: z.uuid().nonempty().nonoptional(),
  });

  const params = schema.parse(request.params);

  const repository = new PropertiesRepository();

  const useCase = new FindPropertyByIdUseCase(repository);

  const response = await useCase.execute(params.propertyId);

  return reply.status(200).send(response);
};
