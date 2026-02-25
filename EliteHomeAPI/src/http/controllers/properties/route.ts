import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";

export const propertiesRoutes = async (app: FastifyInstance) => {
  app.post("/properties", create);
  app.get("/properties", search);
};
