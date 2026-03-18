import type { VisitsRepository } from "../database/repositories/visits";
import { Visit } from "../entities/visit";
import type { VisitStatus } from "../enums/visit-status";

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
  constructor(private repository: VisitsRepository) {}

  async execute(
    data: CreateVisitUseCaseRequest,
  ): Promise<CreateVisitUseCaseReply> {
    const visit = new Visit(data);

    const createVisit = await this.repository.create(visit);

    return { visit: createVisit };
  }
}
