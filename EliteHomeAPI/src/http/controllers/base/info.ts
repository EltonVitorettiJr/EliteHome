import type { FastifyReply, FastifyRequest } from "fastify";
import { AppInfoUseCase } from "../../../useCases/app-info";

export const info = (_request: FastifyRequest, reply: FastifyReply) => {
  const useCase = new AppInfoUseCase();

  const response = useCase.execute();

  return reply.status(200).send(response);
};
