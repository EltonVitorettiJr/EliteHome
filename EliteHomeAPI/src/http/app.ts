import fastifyJwt from "@fastify/jwt";
import "dotenv/config";
import fastify from "fastify";
import { ZodError } from "zod";
import { envs } from "../config/envs";
import { AppError } from "../errors/app-error";
import { baseRoutes } from "./controllers/base/route";
import { managersPropertiesRoutes } from "./controllers/manage/properties/route";
import { publicPropertiesRoutes } from "./controllers/public/properties/routes";
import { userRoutes } from "./controllers/users/routes";

export const app = fastify();

app.register(baseRoutes);
app.register(managersPropertiesRoutes);
app.register(publicPropertiesRoutes);
app.register(userRoutes);
app.register(fastifyJwt, {
  secret: envs.JWT_SECRET,
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "validation error.", issues: error.format() });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send(error.message);
  }

  console.error(error);

  return reply.status(500).send({ message: "Internal server error." });
});
