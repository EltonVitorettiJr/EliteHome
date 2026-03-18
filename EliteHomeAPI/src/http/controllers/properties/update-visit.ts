import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { VisitsRepository } from "../../../database/repositories/visits";
import { UpdateVisitUseCase } from "../../../useCases/update-visit";

export const updateVisit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    id: z.uuid()
  })

  const schema = z.object({
    name: z.string().min(1).max(255).optional(),
    phone: z.string().length(14).optional(),
    email: z.email().optional(),
    date: z.coerce.date().optional(),
    visitStatus: z
      .enum(["INTEREST", "CONFIRMED", "COMPLETED", "CANCELLED"])
      .optional(),
  });

  const params = paramsSchema.parse(request.params)

  const data = schema.parse(request.body)

  const repository = new VisitsRepository()

  const useCase = new UpdateVisitUseCase(repository)
  
  const response = await useCase.execute(params.id, data)

  reply.status(200).send(response)
};
