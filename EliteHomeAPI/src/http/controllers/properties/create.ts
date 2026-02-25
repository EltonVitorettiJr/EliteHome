import type { FastifyReply, FastifyRequest } from "fastify";
import {
  CreatePropertyUseCase,
  type CreatePropertyUseCaseRequest,
} from "../../../useCases/create-property";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  //TODO valiidar os dados do create property
  const useCase = new CreatePropertyUseCase();

  const response = await useCase.execute(
    request.body as CreatePropertyUseCaseRequest,
  );

  return reply.status(201).send(response);
};
