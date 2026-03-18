import type { VisitStatus } from "../enums/visit-status";

interface VisitProps {
  id?: string;
  name: string;
  phone: string;
  email: string;
  date: Date;
  visitStatus?: VisitStatus;
  createdAt?: Date;
  updatedAt?: Date;
  propertyId: string;
}

export class Visit {
  public id?: string;
  public name: string;
  public phone: string;
  public email: string;
  public date: Date;
  public visitStatus?: VisitStatus;
  public createdAt?: Date;
  public updatedAt?: Date;
  public propertyId: string;

  constructor({
    id,
    name,
    phone,
    date,
    email,
    visitStatus,
    createdAt,
    updatedAt,
    propertyId,
  }: VisitProps) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.date = date;
    this.email = email;
    this.visitStatus = visitStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.propertyId = propertyId;
  }
}
