import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../../database/repositories/properties";
import { SearchPropertiesUseCase } from "../../../../useCases/search-properties";

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const queryBoolean = z
    .enum(["true", "false"])
    .transform((value) => value === "true");

  const filtersSchema = z.object({
    isRent: queryBoolean.optional(),
    isSale: queryBoolean.optional(),
    arePetsAllowed: queryBoolean.optional(),
    isNextToSubway: queryBoolean.optional(),
    isFurnished: queryBoolean.optional(),
    maxRentValue: z.coerce.number().optional(),
    maxTotalValue: z.coerce.number().optional(),
    minRooms: z.coerce.number().optional(),
    minBathrooms: z.coerce.number().optional(),
    propertyType: z
      .enum(["APARTMENT", "HOUSE", "TOWNHOUSE", "STUDIO"])
      .optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),
  });

  const filters = filtersSchema.parse(request.query);

  const repository = new PropertiesRepository();

  const useCase = new SearchPropertiesUseCase(repository);

  const response = await useCase.execute(filters);

  return reply.status(200).send(response);
};
