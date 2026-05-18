import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { VisitsRepository } from "../../../../database/repositories/visits";
import { DeleteVisitUseCase } from "../../../../useCases/delete-visit";

export const deleteVisit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const schema = z.object({
    propertyId: z.uuid().nonoptional(),
    visitId: z.uuid().nonoptional(),
  });

  const params = schema.parse(request.params);

  const visitsRepository = new VisitsRepository();
  const propertiesRepository = new PropertiesRepository();

  const useCase = new DeleteVisitUseCase(
    visitsRepository,
    propertiesRepository,
  );

  const response = await useCase.execute(params.propertyId, params.visitId);

  reply.status(200).send(response);
};
