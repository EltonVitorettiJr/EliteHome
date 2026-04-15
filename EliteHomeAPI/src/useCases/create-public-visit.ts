import type { PropertiesRepository } from "../database/repositories/properties";
import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";
import { AlreadyExistsError } from "../errors/already-exists-error";
import { NotFoundError } from "../errors/not-found-error";

export interface CreatePublicVisitUseCaseRequest {
  name: string;
  phone: string;
  email: string;
  date: Date;
  propertyId: string;
}

export interface CreatePublicVisitUseCaseReply {
  visit: Visit;
}

export class CreatePublicVisitUseCase {
  constructor(
    private visitsRepository: VisitsRepository,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute(
    data: CreatePublicVisitUseCaseRequest,
  ): Promise<CreatePublicVisitUseCaseReply> {
    const propertyExists = await this.propertiesRepository.findById(
      data.propertyId,
    );

    if (!propertyExists) {
      throw new NotFoundError("Property not found.");
    }

    const visitExists = await this.visitsRepository.findVisitByUserEmail(
      data.email,
      data.propertyId,
    );

    if (visitExists) {
      throw new AlreadyExistsError("This visit already exists!");
    }

    const visit = await this.visitsRepository.create(data);

    return { visit };
  }
}
