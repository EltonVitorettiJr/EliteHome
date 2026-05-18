import type { PropertiesRepository } from "../database/repositories/properties";
import type { VisitsRepository } from "../database/repositories/visits";
import { Visit } from "../entities/visit";
import type { VisitStatus } from "../enums/visit-status";
import { AlreadyExistsError } from "../errors/already-exists-error";
import { NotFoundError } from "../errors/not-found-error";

export interface CreateVisitUseCaseRequest {
  name: string;
  phone: string;
  email: string;
  date: Date;
  visitStatus?: VisitStatus;
  propertyId: string;
}

interface CreateVisitUseCaseReply {
  visit: Visit;
}

export class CreateVisitUseCase {
  constructor(
    private visitsRepository: VisitsRepository,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute(
    data: CreateVisitUseCaseRequest,
  ): Promise<CreateVisitUseCaseReply> {
    const property = await this.propertiesRepository.findById(data.propertyId);

    if (!property) {
      throw new NotFoundError("Property not found.");
    }

    const visitExists = await this.visitsRepository.findVisitByUserEmail(
      data.email,
      data.propertyId,
    );

    if (
      visitExists?.visitStatus === "CONFIRMED" ||
      visitExists?.visitStatus === "INTEREST"
    ) {
      throw new AlreadyExistsError(
        "You already have a confirmed or pending visit for this property.",
      );
    }

    const visit = new Visit(data);

    const createVisit = await this.visitsRepository.create(visit);

    return { visit: createVisit };
  }
}
