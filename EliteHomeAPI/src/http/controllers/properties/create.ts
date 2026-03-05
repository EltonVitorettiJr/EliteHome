import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../database/repositories/properties";
import { CreatePropertyUseCase } from "../../../useCases/create-property";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const schema = z.object({
    name: z.string().min(1).max(255),
    totalValue: z.number(),
    numberOfRooms: z.number().int(),
    city: z.string().min(1).max(255),
    state: z.string().length(2),
    size: z.string(),
  });

  const data = schema.parse(request.body);

  const repository = new PropertiesRepository();
  const useCase = new CreatePropertyUseCase(repository);

  const response = await useCase.execute(data);

  return reply.status(201).send(response);
};
