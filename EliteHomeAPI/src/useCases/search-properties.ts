import type { PropertiesRepository } from "../database/repositories/properties";
import type { Property } from "../entities/property";
import type { PropertyType } from "../enums/property-type";

export interface SearchPropertiesUseCaseReply {
  properties: Property[];
}

export interface SearchPropertiesFilter {
  isRent?: boolean;
  isSale?: boolean;
  arePetsAllowed?: boolean;
  isNextToSubway?: boolean;
  isFurnished?: boolean;
  maxRentValue?: number;
  maxTotalValue?: number;
  minRooms?: number;
  minBathrooms?: number;
  propertyType?: PropertyType;
}

export class SearchPropertiesUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(
    filters: SearchPropertiesFilter,
  ): Promise<SearchPropertiesUseCaseReply> {
    const properties = await this.repository.find(filters);

    return { properties };
  }
}
