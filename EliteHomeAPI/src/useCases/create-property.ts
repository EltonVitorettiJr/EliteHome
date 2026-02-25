import { knex } from "../database";
import { Property } from "../entities/property";

export interface CreatePropertyUseCaseRequest {
  name: string;
  totalValue: number;
  numberOfRooms: number;
  city: string;
  state: string;
  size: string;
}

type CreatePropertyUseCaseReply = {
  property: Property;
};

export class CreatePropertyUseCase {
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

    const [createProperty] = await knex("properties")
      .insert({
        name: property.name,
        total_value: property.totalValue,
        number_of_rooms: property.numberOfRooms,
        size: property.size,
        city: property.city,
        state: property.state,
      })
      .returning("*");

    return createProperty;
  }
}
