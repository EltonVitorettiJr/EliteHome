import type { FastifyInstance } from "fastify";
import { authenticateUser } from "./authenticate-user";
import { createUser } from "./create-user";

export const userRoutes = (app: FastifyInstance) => {
  app.post("/users", createUser);
  app.post("/auth", authenticateUser);
};
