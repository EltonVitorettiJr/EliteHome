import "dotenv/config";
import fastify from "fastify";
import { ZodError } from "zod";
import { baseRoutes } from "./controllers/base/route";
import { propertiesRoutes } from "./controllers/properties/route";

export const app = fastify();

app.register(baseRoutes);
app.register(propertiesRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "validation error.", issues: error.format() });
  }

  console.error(error);

  return reply.status(500).send({ message: "Internal server error." });
});
