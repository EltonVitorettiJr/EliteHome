import type { PropertiesRepository } from "../database/repositories/properties";
import type { Property } from "../entities/property";

export interface UpdatePropertyUseCaseRequest {
  name?: string;
  address?: string;
  totalValue?: number;
  numberOfRooms?: number;
  rentValue?: number;
  condoValue?: number;
  taxValue?: number;
  numberOfBathrooms?: number;
  garageSlots?: number;
  arePetsAllowed?: boolean;
  isNextToSubway?: boolean;
  isActive?: boolean;
  isSale?: boolean;
  isRent?: boolean;
  isFurnished?: boolean;
  size?: number;
  latitude?: number;
  longitude?: number;
  description?: string;
}

type UpdatePropertyUseCaseReply = {
  property: Property;
};

export class UpdatePropertyUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(
    id: string,
    data: UpdatePropertyUseCaseRequest,
  ): Promise<UpdatePropertyUseCaseReply> {
    const updateProperty = await this.repository.update(id, data);

    return { property: updateProperty };
  }
}
