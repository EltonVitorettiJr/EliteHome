import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";

export const propertiesRoutes = async (app: FastifyInstance) => {
  app.post("/maneger/properties", create);
  app.get("/maneger/properties", search);
};
