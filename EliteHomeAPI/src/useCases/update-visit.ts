import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";
import type { VisitStatus } from "../enums/visit-status";
import { NotFoundError } from "../errors/not-found-error";

interface UpdateVisitUseCaseRequest {
  name?: string;
  phone?: string;
  email?: string;
  date?: Date;
  visitStatus?: VisitStatus;
  propertyId?: string;
}

interface UpdateVisitUseCaseReply {
  visit: Visit;
}

export class UpdateVisitUseCase {
  constructor(private repository: VisitsRepository) {}

  async execute(
    id: string,
    data: UpdateVisitUseCaseRequest,
  ): Promise<UpdateVisitUseCaseReply> {
    const visitExists = await this.repository.findByPropertyId(id);

    if (!visitExists) {
      throw new NotFoundError("Visit not found.");
    }

    const updateVisit = await this.repository.update(id, data);

    return { visit: updateVisit };
  }
}
