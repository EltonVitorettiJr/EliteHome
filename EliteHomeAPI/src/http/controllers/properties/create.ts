import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PropertiesRepository } from "../../../database/repositories/properties";
import { CreatePropertyUseCase } from "../../../useCases/create-property";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const schema = z.object({
    name: z.string().min(1).max(255),
    address: z.string().min(1).max(255),
    totalValue: z.number().int(),
    numberOfRooms: z.number().int(),
    rentValue: z.number().int(),
    condoValue: z.number().int(),
    taxValue: z.number().int(),
    numberOfBathrooms: z.number().int(),
    garageSlots: z.number().int(),
    arePetsAllowed: z.boolean(),
    isNextToSubway: z.boolean(),
    isActive: z.boolean(),
    isSale: z.boolean(),
    isRent: z.boolean(),
    isFurnished: z.boolean(),
    size: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    description: z.string().max(1000).optional(),
    propertyType: z.enum(["APARTMENT", "HOUSE", "TOWNHOUSE", "STUDIO"]).optional()
  });

  const data = schema.parse(request.body);

  const repository = new PropertiesRepository();

  const useCase = new CreatePropertyUseCase(repository);

  const response = await useCase.execute(data);

  return reply.status(201).send(response);
};
