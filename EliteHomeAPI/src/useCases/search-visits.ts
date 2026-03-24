import type { PropertiesRepository } from "../database/repositories/properties";
import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";
import { NotFoundError } from "../errors/not-found-error";

export interface SearchVisitsUseCaseReply {
  visits: Visit[];
}

export class SearchVisitsUseCase {
  constructor(
    private visitRepository: VisitsRepository,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute(propertyId: string): Promise<SearchVisitsUseCaseReply> {
    const propertyExists = this.propertiesRepository.findById(propertyId);

    if (!propertyExists) {
      throw new NotFoundError("Property not found.");
    }

    const visits = await this.visitRepository.findById(propertyId);

    return { visits };
  }
}
