import { compare } from "bcryptjs";
import type { UserRepository } from "../database/repositories/users";
import type { User } from "../entities/user";
import { AppError } from "../errors/app-error";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUserUseCaseReply {
  user: User;
}

export class AuthenticateUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseReply> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials.", 401);
    }

    if (!user.password) {
      throw new AppError("Invalid credentials.", 401);
    }

    const isSamePassword = await compare(password, user.password);

    if (!isSamePassword) {
      throw new AppError("Invalid credentials.", 401);
    }

    return { user };
  }
}
