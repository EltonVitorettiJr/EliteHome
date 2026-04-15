import type { PropertiesRepository } from "../database/repositories/properties";
import type { Property } from "../entities/property";
import { NotFoundError } from "../errors/not-found-error";

interface FindPublicPropertyUseCaseReply {
  property: Property;
}

export class FindPublicPropertyUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(id: string): Promise<FindPublicPropertyUseCaseReply> {
    const property = await this.repository.findById(id);

    if (!property) {
      throw new NotFoundError("Property not found.");
    }

    return { property };
  }
}
