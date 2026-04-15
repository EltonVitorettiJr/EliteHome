// biome-ignore assist/source/organizeImports: <Falso positivo do Biome>
import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";
import type { UserRepository } from "../database/repositories/users";
import type { User } from "../entities/user";
import { AlreadyExistsError } from "../errors/already-exists-error";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserUseCaseReply {
  user: User;
}

export class CreateUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseReply> {
    const userExists = await this.repository.findByEmail(email);

    if (userExists) {
      throw new AlreadyExistsError("This e-mail already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.repository.create({
      id: randomUUID(),
      name,
      email,
      password: passwordHash,
    });

    return { user };
  }
}
