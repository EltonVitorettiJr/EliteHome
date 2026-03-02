import { Property } from "../../entities/property";

interface PropertySchemaProps {
  id?: string | undefined;
  name: string;
  total_value: number;
  number_of_rooms: number;
  size: string;
  city: string;
  state: string;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export class PropertySchema {
  public id?: string | undefined;
  public name: string;
  public total_value: number;
  public number_of_rooms: number;
  public size: string;
  public city: string;
  public state: string;
  public createdAt?: string | undefined;
  public updatedAt?: string | undefined;

  constructor({
    city,
    name,
    number_of_rooms,
    size,
    state,
    total_value,
    createdAt,
    id,
    updatedAt,
  }: PropertySchemaProps) {
    this.city = city;
    this.name = name;
    this.number_of_rooms = number_of_rooms;
    this.size = size;
    this.state = state;
    this.total_value = total_value;
    this.createdAt = createdAt;
    this.id = id;
    this.updatedAt = updatedAt;
  }

  public toEntity() {
    const {
      city,
      createdAt,
      id,
      name,
      number_of_rooms,
      size,
      state,
      total_value,
      updatedAt,
    } = this;

    return new Property({
      id,
      city,
      name,
      size,
      state,
      numberOfRooms: number_of_rooms,
      totalValue: total_value,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    });
  }
}
