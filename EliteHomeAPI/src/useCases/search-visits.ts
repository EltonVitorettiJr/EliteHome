import type { PropertiesRepository } from "../database/repositories/properties";
import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";
import { NotFoundError } from "../errors/not-found-error";

export interface SearchVisitsUseCaseReply {
  visits: Visit[];
}

export class SearchVisitsUseCase {
  constructor(
    private visitsRepository: VisitsRepository,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute(propertyId: string): Promise<SearchVisitsUseCaseReply> {
    const propertyExists = await this.propertiesRepository.findById(propertyId);

    if (!propertyExists) {
      throw new NotFoundError("Property not found.");
    }

    const visits = await this.visitsRepository.findByPropertyId(propertyId);

    return { visits };
  }
}
