import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../database/repositories/properties";
import { VisitsRepository } from "../../../database/repositories/visits";
import { SearchVisitsUseCase } from "../../../useCases/search-visits";

export const searchVisits = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const params = paramsSchema.parse(request.params);

  const visitRepository = new VisitsRepository();

  const propertiesRepository = new PropertiesRepository();

  const useCase = new SearchVisitsUseCase(
    visitRepository,
    propertiesRepository,
  );

  const response = await useCase.execute(params.id);

  reply.status(200).send(response);
};
