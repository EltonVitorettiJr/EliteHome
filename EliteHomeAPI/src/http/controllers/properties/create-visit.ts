import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { VisitsRepository } from "../../../database/repositories/visits";
import { CreateVisitUseCase } from "../../../useCases/create-visit";

export const createVisit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const schema = z.object({
    name: z.string().min(1).max(255),
    phone: z.string().length(14),
    email: z.email(),
    date: z.coerce.date(),
    type: z.enum(["INTEREST", "CONFIRMED", "COMPLETED", "CANCELLED"]),
  });

  const data = schema.parse(request.body);

  const params = paramsSchema.parse(request.params);

  console.log(data, params);

  const repository = new VisitsRepository();

  const useCase = new CreateVisitUseCase(repository);

  const response = await useCase.execute({ ...data, propertyId: params.id });

  reply.status(201).send(response);
};
