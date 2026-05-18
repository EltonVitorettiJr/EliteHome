import type { PropertiesRepository } from "../database/repositories/properties";
import type { VisitsRepository } from "../database/repositories/visits";
import { AppError } from "../errors/app-error";
import { NotFoundError } from "../errors/not-found-error";

export class DeleteVisitUseCase {
  constructor(
    private repository: VisitsRepository,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute(propertyId: string, visitId: string): Promise<object> {
    const propertyExists = await this.propertiesRepository.findById(propertyId);

    if (!propertyExists) {
      throw new NotFoundError("Property not found.");
    }

    const visitExists = await this.repository.findOneVisit(visitId);

    if (!visitExists) {
      throw new NotFoundError("Visit not found.");
    }

    if (visitExists.propertyId !== propertyId) {
      throw new AppError("This visit does not belong to this property.", 403);
    }

    await this.repository.delete(visitId);

    return { message: "Visit deleted." };
  }
}
