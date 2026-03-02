import type { FastifyReply, FastifyRequest } from "fastify";
import { PropertiesRepository } from "../../../database/repositories/properties";
import { SearchPropertiesUseCase } from "../../../useCases/search-properties";

export const search = async (_request: FastifyRequest, reply: FastifyReply) => {
  const repository = new PropertiesRepository();

  const useCase = new SearchPropertiesUseCase(repository);

  const response = await useCase.execute();

  return reply.status(200).send(response);
};
