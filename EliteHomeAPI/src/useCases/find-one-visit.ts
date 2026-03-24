import type { VisitsRepository } from "../database/repositories/visits";
import type { Visit } from "../entities/visit";
import { NotFoundError } from "../errors/not-found-error";

interface FindOneVisitUseCaseReply {
  visit: Visit;
}

export class FindOneVisitUseCase {
  constructor(private repository: VisitsRepository) {}

  async execute(id: string): Promise<FindOneVisitUseCaseReply> {
    const visit = await this.repository.findOneVisit(id);

    if (!visit) {
      throw new NotFoundError("Visit not found.");
    }

    return { visit };
  }
}
