import type { VisitsRepository } from "../database/repositories/visits";
import { NotFoundError } from "../errors/not-found-error";

export class DeleteVisitUseCase {
  constructor(private repository: VisitsRepository) {}

  async execute(id: string): Promise<object> {
    const visitExists = await this.repository.findOneVisit(id);

    if (!visitExists) {
      throw new NotFoundError("Visit not found.");
    }

    await this.repository.delete(id);

    return { message: "Visit deleted." };
  }
}
