import type { PropertiesRepository } from "../database/repositories/properties";
import type { SearchPropertiesFilter } from "./search-properties";

export class SearchPublicPropertiesUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(filters: SearchPropertiesFilter) {
    const properties = await this.repository.findActiveProperties(filters);

    return properties;
  }
}
