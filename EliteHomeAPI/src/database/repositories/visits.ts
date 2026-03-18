import type { Visit } from "../../entities/visit";
import { knex } from "../index";
import { VisitSchema } from "../schemas/visit";

export class VisitsRepository {
  async create(visit: Visit): Promise<Visit> {
    const [createVisit] = await knex<VisitSchema>("visits")
      .insert({
        name: visit.name,
        date: visit.date.toISOString(),
        email: visit.email,
        phone: visit.phone,
        property_id: visit.propertyId,
        visit_status: visit.visitStatus,
      })
      .returning("*");

    const visitEntity = new VisitSchema(createVisit as VisitSchema).toEntity();

    return visitEntity;
  }

  async findById(id: string): Promise<Visit[]> {
    const visits = await knex<VisitSchema>("visits").where({
      property_id: id
    });
    
    const visitsEntities = visits.map((property) =>
      new VisitSchema(property).toEntity(),
    );

    return visitsEntities;
  }

  async update(
    id: string,
    visit: Partial<Omit<Visit, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Visit> {
    const [updatedVisit] = await knex<VisitSchema>("visits")
      .update({
        ...(visit.name && { name: visit.name }),
        ...(visit.date && { date: visit.date.toISOString() }),
        ...(visit.email && { email: visit.email }),
        ...(visit.phone && { phone: visit.phone }),
        ...(visit.propertyId && { property_id: visit.propertyId }),
        ...(visit.visitStatus && { visit_status: visit.visitStatus }),
      })
      .where({ id })
      .returning("*");

    const visitEntity = new VisitSchema(updatedVisit as VisitSchema).toEntity();

    return visitEntity;
  }
}
