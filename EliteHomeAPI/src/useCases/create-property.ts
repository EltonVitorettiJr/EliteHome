import type { PropertiesRepository } from "../database/repositories/properties";
import { Property } from "../entities/property";
import type { PropertyType } from "../enums/property-type";

export interface CreatePropertyUseCaseRequest {
  name: string;
  address: string;
  totalValue: number;
  numberOfRooms: number;
  rentValue: number;
  condoValue: number;
  taxValue: number;
  numberOfBathrooms: number;
  garageSlots: number;
  arePetsAllowed: boolean;
  isNextToSubway: boolean;
  isActive: boolean;
  isSale: boolean;
  isRent: boolean;
  isFurnished: boolean;
  size: number;
  latitude: number;
  longitude: number;
  description?: string;
  propertyType?: PropertyType;
}

type CreatePropertyUseCaseReply = {
  property: Property;
};

export class CreatePropertyUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(
    data: CreatePropertyUseCaseRequest,
  ): Promise<CreatePropertyUseCaseReply> {
    const property = new Property(data);

    const createProperty = await this.repository.create(property);

    return { property: createProperty };
  }
}
