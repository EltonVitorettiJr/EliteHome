import type { PropertiesRepository } from "../database/repositories/properties";

export class SearchPublicPropertiesUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute() {
    const properties = await this.repository.findActiveProperties();

    return properties;
  }
}
