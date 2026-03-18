import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../database/repositories/properties";
import { DeletePropertyUseCase } from "../../../useCases/delete-property";

export const deleteProperty = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const schema = z.object({
    id: z.uuid(),
  });

  const data = schema.parse(request.params)

  const repository = new PropertiesRepository()

  const useCase = new DeletePropertyUseCase(repository)

  const response = await useCase.execute(data.id)

  reply.status(200).send(response)
};
