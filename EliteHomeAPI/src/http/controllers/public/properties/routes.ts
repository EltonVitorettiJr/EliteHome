import type { FastifyInstance } from "fastify";
import { createPublicVisit } from "./create-public-visit";
import { findPublicProperty } from "./find-public-property";
import { searchPublicProperties } from "./search-public-properties";

export const publicPropertiesRoutes = (app: FastifyInstance) => {
  app.get("/properties", searchPublicProperties);
  app.get("/properties/:id", findPublicProperty);
  app.post("/properties/:id/visit", createPublicVisit);
};
