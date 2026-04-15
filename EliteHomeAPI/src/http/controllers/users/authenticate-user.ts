import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserRepository } from "../../../database/repositories/users";
import { AuthenticateUserUseCase } from "../../../useCases/authenticate-user";

export const authenticateUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const schema = z.object({
    email: z.email(),
    password: z.string().min(3),
  });

  const data = schema.parse(request.body);

  const repository = new UserRepository();

  const useCase = new AuthenticateUserUseCase(repository);

  const { user } = await useCase.execute(data);

  const token = await reply.jwtSign(
    {
      role: "MANAGER",
    },
    // O segundo objeto são as configurações do Token
    {
      sign: {
        sub: user.id, // Subject: Quem é o dono desse token?
        expiresIn: "7d", // O token vence em 7 dias (o cara vai ter que logar de novo)
      },
    },
  );

  reply.status(200).send({ token });
};
