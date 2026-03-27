import "dotenv/config";
import fastify from "fastify";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error";
import { baseRoutes } from "./controllers/base/route";
import { managersPropertiesRoutes } from "./controllers/managers/properties/route";
import { publicPropertiesRoutes } from "./controllers/public/properties/routes";

export const app = fastify();

app.register(baseRoutes);
app.register(managersPropertiesRoutes);
app.register(publicPropertiesRoutes);

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
