import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../database/repositories/properties";

import { UpdatePropertyUseCase } from "../../../useCases/update-property";

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const paramsSchema = z.object({
    id: z.uuid().nonempty().nonoptional(),
  });

  const schema = z.object({
    name: z.string().min(1).max(255).optional(),
    address: z.string().min(1).max(255).optional(),
    totalValue: z.number().int().optional(),
    numberOfRooms: z.number().int().optional(),
    rentValue: z.number().int().optional(),
    condoValue: z.number().int().optional(),
    taxValue: z.number().int().optional(),
    numberOfBathrooms: z.number().int().optional(),
    garageSlots: z.number().int().optional(),
    arePetsAllowed: z.boolean().optional(),
    isNextToSubway: z.boolean().optional(),
    isActive: z.boolean().optional(),
    isSale: z.boolean().optional(),
    isRent: z.boolean().optional(),
    isFurnished: z.boolean().optional(),
    size: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    description: z.string().max(1000).optional().optional(),
    propertyType: z.enum(["APARTMENT", "HOUSE", "TOWNHOUSE", "STUDIO"]).optional(),
  });

  const data = schema.parse(request.body);

  const params = paramsSchema.parse(request.params);

  const repository = new PropertiesRepository();

  const useCase = new UpdatePropertyUseCase(repository);

  const response = await useCase.execute(params.id, data);

  return reply.status(200).send(response);
};
