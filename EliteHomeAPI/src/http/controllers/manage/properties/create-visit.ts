import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { VisitsRepository } from "../../../../database/repositories/visits";
import { CreateVisitUseCase } from "../../../../useCases/create-visit";

export const createVisit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    propertyId: z.uuid(),
  });

  const schema = z.object({
    name: z.string().min(1).max(255),
    phone: z.string().length(14),
    email: z.email(),
    date: z.coerce.date(),
    visitStatus: z
      .enum(["INTEREST", "CONFIRMED", "COMPLETED", "CANCELLED"])
      .optional(),
  });

  const data = schema.parse(request.body);

  const params = paramsSchema.parse(request.params);

  const visitRepository = new VisitsRepository();
  const propertiesRepository = new PropertiesRepository();

  const useCase = new CreateVisitUseCase(visitRepository, propertiesRepository);

  const response = await useCase.execute({
    ...data,
    propertyId: params.propertyId,
  });

  reply.status(201).send(response);
};
