import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { VisitsRepository } from "../../../../database/repositories/visits";
import { FindOneVisitUseCase } from "../../../../useCases/find-one-visit";

export const findOneVisit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const params = paramsSchema.parse(request.params);

  const repository = new VisitsRepository();

  const useCase = new FindOneVisitUseCase(repository);

  const response = await useCase.execute(params.id);

  reply.status(200).send(response);
};
