import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { VisitsRepository } from "../../../../database/repositories/visits";
import { CreatePublicVisitUseCase } from "../../../../useCases/create-public-visit";

export const createPublicVisit = async (
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
  });

  const params = paramsSchema.parse(request.params);

  const data = schema.parse(request.body);

  const repository = new VisitsRepository();

  const useCase = new CreatePublicVisitUseCase(repository);

  const response = await useCase.execute({ ...data, propertyId: params.id });

  reply.status(200).send(response);
};
