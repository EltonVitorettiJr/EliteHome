import { Property } from "../entities/property";

interface CreatePropertyUseCaseRequest {
  name: string;
  totalValue: number;
  numberOfRooms: number;
  city: string;
  state: string;
  size: string;
}

type CreatePropertyUseCaseResponse = {
  property: Property;
};

export class CreatePropertyUseCase {
  execute({
    name,
    city,
    numberOfRooms,
    size,
    state,
    totalValue,
  }: CreatePropertyUseCaseRequest): CreatePropertyUseCaseResponse {
    const property = new Property({
      name,
      city,
      numberOfRooms,
      size,
      state,
      totalValue,
    });

    return { property };
  }
}
