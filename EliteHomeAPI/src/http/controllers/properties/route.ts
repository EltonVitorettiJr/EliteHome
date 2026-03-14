import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { createVisit } from "./create-visit";
import { findById } from "./find-by-id";
import { search } from "./search";
import { update } from "./update";

export const propertiesRoutes = async (app: FastifyInstance) => {
  app.post("/maneger/properties", create);
  app.get("/maneger/properties", search);
  app.get("/maneger/properties/:id", findById);
  app.patch("/maneger/properties/:id", update);

  app.post("/maneger/properties/:id/visit", createVisit);
};
