import type { FastifyReply, FastifyRequest } from "fastify";
import { SearchPropertiesUseCase } from "../../../useCases/search-properties";

export const search = async (_request: FastifyRequest, reply: FastifyReply) => {
  const useCase = new SearchPropertiesUseCase();

  const response = useCase.execute();

  return reply.status(200).send(response);
};
