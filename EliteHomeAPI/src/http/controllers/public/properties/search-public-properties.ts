import type { FastifyReply, FastifyRequest } from "fastify";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { SearchPublicPropertiesUseCase } from "../../../../useCases/search-public-properties";

export const searchPublicProperties = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const repository = new PropertiesRepository();

  const useCase = new SearchPublicPropertiesUseCase(repository);

  const response = await useCase.execute();

  reply.status(200).send(response);
};
