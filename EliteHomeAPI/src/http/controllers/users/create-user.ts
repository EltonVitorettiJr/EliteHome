import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserRepository } from "../../../database/repositories/users";
import { CreateUserUseCase } from "../../../useCases/create-user";

export const createUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const schema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
  });

  const data = schema.parse(request.body);

  const repository = new UserRepository();

  const useCase = new CreateUserUseCase(repository);

  const { user } = await useCase.execute(data);

  const { password, ...userSecurity } = user;

  reply.status(201).send({ user: userSecurity });
};
