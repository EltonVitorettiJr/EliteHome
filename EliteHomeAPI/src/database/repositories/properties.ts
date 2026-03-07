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
        address: property.address,
        total_value: property.totalValue,
        number_of_rooms: property.numberOfRooms,
        rent_value: property.rentValue,
        condo_value: property.condoValue,
        tax_value: property.taxValue,
        number_of_bathrooms: property.numberOfBathrooms,
        garage_slots: property.garageSlots,
        are_pets_allowed: property.arePetsAllowed,
        is_next_to_subway: property.isNextToSubway,
        is_active: property.isActive,
        is_sale: property.isSale,
        is_rent: property.isRent,
        is_furnished: property.isFurnished,
        size: property.size,
        latitude: property.latitude,
        longitude: property.longitude,
        description: property.description,
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
