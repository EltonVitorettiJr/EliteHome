import type { PropertiesRepository } from "../database/repositories/properties";
import type { Property } from "../entities/property";

export interface SearchPropertiesUseCaseReply {
  properties: Property[];
}

export class SearchPropertiesUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(): Promise<SearchPropertiesUseCaseReply> {
    const properties = await this.repository.find();

    return { properties };
  }
}
