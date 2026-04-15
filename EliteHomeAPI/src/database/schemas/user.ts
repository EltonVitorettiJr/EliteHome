import { User } from "../../entities/user";

interface UserSchemaProps {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserSchema {
  public id: string;
  public name: string;
  public email: string;
  public password?: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor({
    email,
    id,
    name,
    created_at,
    password,
    updated_at,
  }: UserSchemaProps) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toEntity() {
    const { email, id, name, created_at, password, updated_at } = this;

    return new User({
      id,
      name,
      email,
      password,
      createdAt: created_at ? new Date(created_at) : undefined,
      updatedAt: updated_at ? new Date(updated_at) : undefined,
    });
  }
}
