import type { PropertyImagesRepository } from "../database/repositories/image";
import type { PropertiesRepository } from "../database/repositories/properties";
import type { Image } from "../entities/image";
import { NotFoundError } from "../errors/not-found-error";

export class FindPropertyImagesUseCase {
  constructor(
    private propertiesRepository: PropertiesRepository,
    private propertyImagesRepository: PropertyImagesRepository,
  ) {}

  async execute(propertyId: string): Promise<Image[]> {
    const propertyExists = await this.propertiesRepository.findById(propertyId);

    if (!propertyExists) {
      throw new NotFoundError("Property not found.");
    }

    const images =
      await this.propertyImagesRepository.getImagesByPropertyId(propertyId);

    return images;
  }
}
