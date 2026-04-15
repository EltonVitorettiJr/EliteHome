import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { VisitsRepository } from "../../../../database/repositories/visits";
import { DeleteVisitUseCase } from "../../../../useCases/delete-visit";

export const deleteVisit = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const schema = z.object({
    id: z.uuid(),
  });

  const params = schema.parse(request.params);

  const repository = new VisitsRepository();

  const useCase = new DeleteVisitUseCase(repository);

  const response = await useCase.execute(params.id);

  reply.status(200).send(response);
};
