import type { PropertiesRepository } from "../database/repositories/properties";
import type { Property } from "../entities/property";

export class FindPublicPropertyUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(id: string): Promise<Property> {
    const propery = this.repository.findById(id);

    return propery;
  }
}
