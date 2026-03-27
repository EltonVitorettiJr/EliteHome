import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";

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
  constructor(private repository: VisitsRepository) {}

  async execute(
    data: CreatePublicVisitUseCaseRequest,
  ): Promise<CreatePublicVisitUseCaseReply> {
    const visit = await this.repository.create(data);

    return { visit };
  }
}
