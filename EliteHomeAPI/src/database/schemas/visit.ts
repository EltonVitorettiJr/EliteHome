import { Visit } from "../../entities/visit";
import type { VisitStatus } from "../../enums/visit-status";

interface VisitSchemaProps {
  id?: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  visit_status?: VisitStatus;
  created_at?: string;
  updated_at?: string;
  property_id: string;
}

export class VisitSchema {
  public id?: string;
  public name: string;
  public phone: string;
  public email: string;
  public date: string;
  public visit_status?: VisitStatus;
  public created_at?: string;
  public updated_at?: string;
  public property_id: string;

  constructor({
    id,
    name,
    date,
    email,
    phone,
    property_id,
    created_at,
    updated_at,
    visit_status,
  }: VisitSchemaProps) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.property_id = property_id;
    this.visit_status = visit_status;
  }

  public toEntity() {
    const {
      id,
      name,
      date,
      email,
      phone,
      visit_status,
      property_id,
      created_at,
      updated_at,
    } = this;

    return new Visit({
      id,
      name,
      date: new Date(date),
      email,
      phone,
      visitStatus: visit_status,
      propertyId: property_id,
      createdAt: created_at ? new Date(created_at) : undefined,
      updatedAt: updated_at ? new Date(updated_at) : undefined,
    });
  }
}
