import type { PropertiesRepository } from "../database/repositories/properties";
import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";
import { NotFoundError } from "../errors/not-found-error";

interface FindOneVisitUseCaseReply {
  visit: Visit;
}

export class FindOneVisitUseCase {
  constructor(
    private visitRepository: VisitsRepository,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute(
    propertyId: string,
    visitId: string,
  ): Promise<FindOneVisitUseCaseReply> {
    const propertyExists = await this.propertiesRepository.findById(propertyId);

    if (!propertyExists) {
      throw new NotFoundError("Property not found.");
    }

    const visit = await this.visitRepository.findOneVisit(visitId);

    if (!visit) {
      throw new NotFoundError("Visit not found.");
    }

    return { visit };
  }
}
