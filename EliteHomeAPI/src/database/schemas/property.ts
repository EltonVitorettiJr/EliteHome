import { Property } from "../../entities/property";
import type { PropertyType } from "../../enums/property-type";

interface PropertySchemaProps {
  id?: string;
  name: string;
  address: string;
  total_value: number;
  number_of_rooms: number;
  rent_value: number;
  condo_value: number;
  tax_value: number;
  number_of_bathrooms: number;
  garage_slots: number;
  are_pets_allowed: boolean;
  is_next_to_subway: boolean;
  is_active: boolean;
  is_sale: boolean;
  is_rent: boolean;
  is_furnished: boolean;
  size: number;
  latitude: number;
  longitude: number;
  property_type?: PropertyType;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export class PropertySchema {
  public id?: string;
  public name: string;
  public address: string;
  public total_value: number;
  public number_of_rooms: number;
  public rent_value: number;
  public condo_value: number;
  public tax_value: number;
  public number_of_bathrooms: number;
  public garage_slots: number;
  public are_pets_allowed: boolean;
  public is_next_to_subway: boolean;
  public is_active: boolean;
  public is_sale: boolean;
  public is_rent: boolean;
  public is_furnished: boolean;
  public size: number;
  public latitude: number;
  public longitude: number;
  public property_type?: PropertyType;
  public description?: string;
  public created_at?: string;
  public updated_at?: string;

  constructor({
    id,
    name,
    address,
    total_value,
    number_of_rooms,
    rent_value,
    condo_value,
    tax_value,
    number_of_bathrooms,
    garage_slots,
    are_pets_allowed,
    is_next_to_subway,
    is_active,
    is_sale,
    is_rent,
    is_furnished,
    size,
    latitude,
    longitude,
    property_type,
    description,
    created_at,
    updated_at,
  }: PropertySchemaProps) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.total_value = total_value;
    this.number_of_rooms = number_of_rooms;
    this.rent_value = rent_value;
    this.condo_value = condo_value;
    this.tax_value = tax_value;
    this.number_of_bathrooms = number_of_bathrooms;
    this.garage_slots = garage_slots;
    this.are_pets_allowed = are_pets_allowed;
    this.is_next_to_subway = is_next_to_subway;
    this.is_active = is_active;
    this.is_sale = is_sale;
    this.is_rent = is_rent;
    this.is_furnished = is_furnished;
    this.size = size;
    this.latitude = latitude;
    this.longitude = longitude;
    this.property_type = property_type;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public toEntity() {
    const {
      id,
      name,
      address,
      total_value,
      number_of_rooms,
      rent_value,
      condo_value,
      tax_value,
      number_of_bathrooms,
      garage_slots,
      are_pets_allowed,
      is_next_to_subway,
      is_active,
      is_sale,
      is_rent,
      is_furnished,
      size,
      latitude,
      longitude,
      property_type,
      description,
      created_at,
      updated_at,
    } = this;

    return new Property({
      id,
      name,
      address,
      totalValue: total_value,
      numberOfRooms: number_of_rooms,
      rentValue: rent_value,
      condoValue: condo_value,
      taxValue: tax_value,
      numberOfBathrooms: number_of_bathrooms,
      garageSlots: garage_slots,
      arePetsAllowed: are_pets_allowed,
      isNextToSubway: is_next_to_subway,
      isActive: is_active,
      isSale: is_sale,
      isRent: is_rent,
      isFurnished: is_furnished,
      size,
      latitude,
      longitude,
      description,
      propertyType: property_type,
      createdAt: created_at ? new Date(created_at) : undefined,
      updatedAt: updated_at ? new Date(updated_at) : undefined,
    });
  }
}
