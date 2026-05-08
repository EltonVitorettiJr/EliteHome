import type { PropertyImagesRepository } from "../database/repositories/image";
import { AppError } from "../errors/app-error";
import type { StorageProvider } from "../providers/storage-provider";

interface UploadPropertyImagesUseCaseRequest {
  propertyId: string;
  files: {
    fileName: string;
    fileBuffer: Buffer;
  }[];
}

export class UploadPropertyImagesUseCase {
  constructor(
    private imageRepository: PropertyImagesRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute({ propertyId, files }: UploadPropertyImagesUseCaseRequest) {
    const currentImages =
      await this.imageRepository.countByPropertyId(propertyId);

    if (currentImages + files.length > 10) {
      throw new AppError("A property cannot have more than 10 images.", 422);
    }

    const uploadedImagesUrls = [];

    for (const file of files) {
      const url = await this.storageProvider.saveFile(
        file.fileName,
        file.fileBuffer,
      );

      await this.imageRepository.create({
        propertyId,
        urlImage: url,
      });

      uploadedImagesUrls.push(url);
    }

    return { urls: uploadedImagesUrls };
  }
}
