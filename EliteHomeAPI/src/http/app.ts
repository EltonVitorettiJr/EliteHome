// biome-ignore assist/source/organizeImports: <Falso positivo do Biome>
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import "dotenv/config";
import fastify from "fastify";
import path from "node:path";
import { ZodError } from "zod";
import { envs } from "../config/envs";
import { AppError } from "../errors/app-error";
import { baseRoutes } from "./controllers/base/route";
import { managersPropertiesRoutes } from "./controllers/manage/properties/route";
import { publicPropertiesRoutes } from "./controllers/public/properties/routes";
import { userRoutes } from "./controllers/users/routes";

export const app = fastify();

app.register(fastifyStatic, {
  root: path.resolve(__dirname, "../../uploads"),

  prefix: "/uploads/",
});
app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
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
