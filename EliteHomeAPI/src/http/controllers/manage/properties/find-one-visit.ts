import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { VisitsRepository } from "../../../../database/repositories/visits";
import { FindOneVisitUseCase } from "../../../../useCases/find-one-visit";

export const findOneVisit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    propertyId: z.uuid().nonoptional(),
    visitId: z.uuid().nonoptional(),
  });

  const params = paramsSchema.parse(request.params);

  const visitRepository = new VisitsRepository();

  const propertiesRepository = new PropertiesRepository();

  const useCase = new FindOneVisitUseCase(
    visitRepository,
    propertiesRepository,
  );

  const response = await useCase.execute(params.propertyId, params.visitId);

  reply.status(200).send(response);
};
