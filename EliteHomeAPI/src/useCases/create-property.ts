import type { PropertiesRepository } from "../database/repositories/properties";
import { Property } from "../entities/property";
import type { PropertyType } from "../enums/property-type";
import { AppError } from "../errors/app-error";
import type { NominatimProvider } from "../providers/implementations/nominatim-provider";

export interface CreatePropertyUseCaseRequest {
  name: string;
  address: string;
  totalValue: number;
  numberOfRooms: number;
  rentValue: number;
  condoValue: number;
  taxValue: number;
  numberOfBathrooms: number;
  garageSlots: number;
  arePetsAllowed: boolean;
  isNextToSubway: boolean;
  isActive: boolean;
  isSale: boolean;
  isRent: boolean;
  isFurnished: boolean;
  size: number;
  latitude?: number;
  longitude?: number;
  description?: string;
  propertyType?: PropertyType;
}

type CreatePropertyUseCaseReply = {
  property: Property;
};

export class CreatePropertyUseCase {
  constructor(
    private repository: PropertiesRepository,
    private nominatimProvider: NominatimProvider,
  ) {}

  async execute(
    data: CreatePropertyUseCaseRequest,
  ): Promise<CreatePropertyUseCaseReply> {
    let finalLatitude = data.latitude;
    let finalLongitude = data.longitude;

    if (!finalLatitude || !finalLongitude) {
      const coordinates = await this.nominatimProvider.getCoordinates(
        data.address,
      );

      if (!coordinates) {
        throw new AppError(
          "Unable to get coordinates for the provided address.",
          400,
        );
      }

      finalLatitude = coordinates.latitude;
      finalLongitude = coordinates.longitude;
    }

    const property = new Property({
      ...data,
      latitude: finalLatitude,
      longitude: finalLongitude,
    });

    const createProperty = await this.repository.create(property);

    return { property: createProperty };
  }
}
