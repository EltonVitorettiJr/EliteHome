interface PropertyProps {
  id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export class Property {
  public id?: string;
  public name: string;
  public address: string;
  public totalValue: number;
  public numberOfRooms: number;
  public rentValue: number;
  public condoValue: number;
  public taxValue: number;
  public numberOfBathrooms: number;
  public garageSlots: number;
  public arePetsAllowed: boolean;
  public isNextToSubway: boolean;
  public isActive: boolean;
  public isSale: boolean;
  public isRent: boolean;
  public isFurnished: boolean;
  public size: number;
  public latitude: number;
  public longitude: number;
  public description?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor({
    id,
    name,
    address,
    totalValue,
    numberOfRooms,
    rentValue,
    condoValue,
    taxValue,
    numberOfBathrooms,
    garageSlots,
    arePetsAllowed,
    isNextToSubway,
    isActive,
    isSale,
    isRent,
    isFurnished,
    size,
    latitude,
    longitude,
    description,
    createdAt,
    updatedAt,
  }: PropertyProps) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.totalValue = totalValue;
    this.numberOfRooms = numberOfRooms;
    this.rentValue = rentValue;
    this.condoValue = condoValue;
    this.taxValue = taxValue;
    this.numberOfBathrooms = numberOfBathrooms;
    this.garageSlots = garageSlots;
    this.arePetsAllowed = arePetsAllowed;
    this.isNextToSubway = isNextToSubway;
    this.isActive = isActive;
    this.isSale = isSale;
    this.isRent = isRent;
    this.isFurnished = isFurnished;
    this.size = size;
    this.latitude = latitude;
    this.longitude = longitude;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
