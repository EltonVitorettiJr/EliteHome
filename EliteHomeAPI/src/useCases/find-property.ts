import type { PropertiesRepository } from "../database/repositories/properties";
import type { Property } from "../entities/property";
import { NotFoundError } from "../errors/not-found-error";

export interface FindPropertyByIdUseCaseReply {
  property: Property;
}

export class FindPropertyByIdUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(id: string): Promise<FindPropertyByIdUseCaseReply> {
    const property = await this.repository.findById(id);

    if (!property) {
      throw new NotFoundError("Property not Found.");
    }

    return { property };
  }
}
