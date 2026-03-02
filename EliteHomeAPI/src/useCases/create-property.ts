import type { PropertiesRepositoryProps } from "../database/repositories/properties";
import { Property } from "../entities/property";

export interface CreatePropertyUseCaseRequest {
  id?: string;
  name: string;
  totalValue: number;
  numberOfRooms: number;
  city: string;
  state: string;
  size: string;
  createdAt?: string;
  updatedAt?: string;
}

type CreatePropertyUseCaseReply = {
  property: Property;
};

export class CreatePropertyUseCase {
  constructor(private repository: PropertiesRepositoryProps) {}

  async execute({
    name,
    city,
    numberOfRooms,
    size,
    state,
    totalValue,
  }: CreatePropertyUseCaseRequest): Promise<CreatePropertyUseCaseReply> {
    const property = new Property({
      name,
      city,
      numberOfRooms,
      size,
      state,
      totalValue,
    });

    const createProperty = await this.repository.create(property);

    return { property: createProperty };
  }
}
