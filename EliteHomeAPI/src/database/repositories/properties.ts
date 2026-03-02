import type { Property } from "../../entities/property";
import { knex } from "../index";
import { PropertySchema } from "../schemas/property";

export interface PropertiesRepositoryProps {
  create: (property: Property) => Promise<Property>;
  find: () => Promise<Property[]>;
}

export class PropertiesRepository implements PropertiesRepositoryProps {
  async create(property: Property): Promise<Property> {
    const [createProperty] = await knex<PropertySchema>("properties")
      .insert({
        name: property.name,
        total_value: property.totalValue,
        number_of_rooms: property.numberOfRooms,
        size: property.size,
        city: property.city,
        state: property.state,
      })
      .returning("*");

    const propertyEntity = new PropertySchema(
      createProperty as PropertySchema,
    ).toEntity();

    return propertyEntity;
  }

  async find(): Promise<Property[]> {
    const properties = await knex<PropertySchema>("properties");

    const propertiesEntities = properties.map((property) =>
      new PropertySchema(property).toEntity(),
    );

    return propertiesEntities;
  }
}
