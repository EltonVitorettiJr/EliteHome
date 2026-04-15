interface UserProps {
  id: string;
  name: string;
  email: string;
  //senha opcional porque quase nunca retornamos ela
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  public id: string;
  public name: string;
  public email: string;
  public password?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor({ email, id, name, createdAt, password, updatedAt }: UserProps) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
