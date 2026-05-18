import type { PropertyImagesRepository } from "../database/repositories/image";
import type { PropertiesRepository } from "../database/repositories/properties";
import { AppError } from "../errors/app-error";
import { NotFoundError } from "../errors/not-found-error";
import type { StorageProvider } from "../providers/storage-provider";

export class DeletePropertyImageUseCase {
  constructor(
    private imageRepository: PropertyImagesRepository,
    private storageProvider: StorageProvider,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute(propertyId: string, imageId: string): Promise<object> {
    const propertyExists = await this.propertiesRepository.findById(propertyId);

    if (!propertyExists) {
      throw new NotFoundError("Property not found.");
    }

    const image = await this.imageRepository.findById(imageId);

    if (!image) {
      throw new NotFoundError("Image not found.");
    }

    if (image.property_id !== propertyId) {
      throw new AppError("This image does not belong to this property.", 403);
    }

    await this.storageProvider.deleteFile(image.url);

    await this.imageRepository.delete(imageId);

    return { message: "Image deleted." };
  }
}
