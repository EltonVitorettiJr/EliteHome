import type { PropertiesRepository } from "../database/repositories/properties";
import { NotFoundError } from "../errors/not-found-error";

export class DeletePropertyUseCase {
  constructor(private repository: PropertiesRepository) {}

  async execute(id: string): Promise<object> {
    const propertyExists = await this.repository.findById(id)

    if (!propertyExists) {
      throw new NotFoundError("Property not found.")
    }

    await this.repository.delete(id);

    return { message: "Property deleted." };
  }
}
