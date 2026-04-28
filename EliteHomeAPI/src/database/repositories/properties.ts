import type { Property } from "../../entities/property";
import type { SearchPropertiesFilter } from "../../useCases/search-properties";
import { knex } from "../index";
import { PropertySchema } from "../schemas/property";

export class PropertiesRepository {
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
        ...(property.propertyType && { property_type: property.propertyType }),
      })
      .returning("*");

    const propertyEntity = new PropertySchema(
      createProperty as PropertySchema,
    ).toEntity();

    return propertyEntity;
  }

  async find(filters: SearchPropertiesFilter): Promise<Property[]> {
    const {
      arePetsAllowed,
      isFurnished,
      isNextToSubway,
      isRent,
      isSale,
      maxRentValue,
      maxTotalValue,
      minBathrooms,
      minRooms,
      propertyType,
    } = filters;

    const query = knex<PropertySchema>("properties");

    query.modify((queryBuilder) => {
      //filtros boolean
      if (isRent !== undefined) queryBuilder.where("is_rent", isRent);
      if (isSale) queryBuilder.where("is_sale", isSale);
      if (arePetsAllowed)
        queryBuilder.where("are_pets_allowed", arePetsAllowed);
      if (isNextToSubway)
        queryBuilder.where("is_next_to_subway", isNextToSubway);
      if (isFurnished) queryBuilder.where("is_furnished", isFurnished);

      //filtros number
      if (maxRentValue) queryBuilder.where("rent_value", "<=", maxRentValue);
      if (maxTotalValue) queryBuilder.where("total_value", "<=", maxTotalValue);
      if (minBathrooms)
        queryBuilder.where("number_of_bathrooms", ">=", minBathrooms);
      if (minRooms) queryBuilder.where("number_of_rooms", ">=", minRooms);

      if (propertyType) queryBuilder.where("property_type", "=", propertyType);
    });

    const properties = await query;

    const propertiesEntities = properties.map((property) =>
      new PropertySchema(property).toEntity(),
    );

    return propertiesEntities;
  }

  async findActiveProperties(
    filters: SearchPropertiesFilter = {},
  ): Promise<Property[]> {
    const {
      arePetsAllowed,
      isFurnished,
      isNextToSubway,
      isRent,
      isSale,
      maxRentValue,
      maxTotalValue,
      minBathrooms,
      minRooms,
      propertyType,
    } = filters;

    const query = knex<PropertySchema>("properties").where({
      is_active: true,
    });

    query.modify((queryBuilder) => {
      //filtros boolean
      if (isRent !== undefined) queryBuilder.where("is_rent", isRent);
      if (isSale !== undefined) queryBuilder.where("is_sale", isSale);
      if (arePetsAllowed !== undefined)
        queryBuilder.where("are_pets_allowed", arePetsAllowed);
      if (isNextToSubway !== undefined)
        queryBuilder.where("is_next_to_subway", isNextToSubway);
      if (isFurnished !== undefined)
        queryBuilder.where("is_furnished", isFurnished);

      //filtros number
      if (maxRentValue) queryBuilder.where("rent_value", "<=", maxRentValue);
      if (maxTotalValue) queryBuilder.where("total_value", "<=", maxTotalValue);
      if (minBathrooms)
        queryBuilder.where("number_of_bathrooms", ">=", minBathrooms);
      if (minRooms) queryBuilder.where("number_of_rooms", ">=", minRooms);

      if (propertyType) queryBuilder.where("property_type", "=", propertyType);
    });

    const properties = await query;

    const propertiesEntities = properties.map((p) =>
      new PropertySchema(p).toEntity(),
    );

    return propertiesEntities;
  }

  async findById(id: string): Promise<Property | undefined> {
    const property = await knex<PropertySchema>("properties").where({ id });

    if (property.length === 0) {
      return undefined;
    }

    const propertyEntity = property.map((p) =>
      new PropertySchema(p).toEntity(),
    );

    return propertyEntity.at(0);
  }

  async update(
    id: string,
    property: Partial<Omit<Property, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Property> {
    const [updatedProperty] = await knex<PropertySchema>("properties")
      .update({
        ...(property.name && { name: property.name }),
        ...(property.address && { address: property.address }),
        ...(property.totalValue && { total_value: property.totalValue }),
        ...(property.numberOfRooms && {
          number_of_rooms: property.numberOfRooms,
        }),
        ...(property.rentValue && { rent_value: property.rentValue }),
        ...(property.condoValue && { condo_value: property.condoValue }),
        ...(property.taxValue && { tax_value: property.taxValue }),
        ...(property.numberOfBathrooms && {
          number_of_bathrooms: property.numberOfBathrooms,
        }),
        ...(property.garageSlots && { garage_slots: property.garageSlots }),
        ...(property.arePetsAllowed !== undefined && {
          are_pets_allowed: property.arePetsAllowed,
        }),
        ...(property.isNextToSubway !== undefined && {
          is_next_to_subway: property.isNextToSubway,
        }),
        ...(property.isActive !== undefined && {
          is_active: property.isActive,
        }),
        ...(property.isSale !== undefined && { is_sale: property.isSale }),
        ...(property.isRent !== undefined && { is_rent: property.isRent }),
        ...(property.isFurnished !== undefined && {
          is_furnished: property.isFurnished,
        }),
        ...(property.size && { size: property.size }),
        ...(property.latitude && { latitude: property.latitude }),
        ...(property.longitude && { longitude: property.longitude }),
        ...(property.description && { description: property.description }),
        ...(property.propertyType && { property_type: property.propertyType }),
      })
      .where({ id })
      .returning("*");

    const propertyEntity = new PropertySchema(
      updatedProperty as PropertySchema,
    ).toEntity();

    return propertyEntity;
  }

  async delete(id: string): Promise<void> {
    await knex("properties")
      .where({
        id,
      })
      .delete();

    return;
  }
}
