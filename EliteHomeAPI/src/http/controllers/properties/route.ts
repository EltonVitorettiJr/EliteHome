import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { createVisit } from "./create-visit";
import { deleteProperty } from "./delete-property";
import { findById } from "./find-by-id";
import { search } from "./search";
import { update } from "./update";
import { updateVisit } from "./update-visit";

export const propertiesRoutes = async (app: FastifyInstance) => {
  app.post("/manager/properties", create);
  app.get("/manager/properties", search);
  app.get("/manager/properties/:id", findById);
  app.patch("/manager/properties/:id", update);
  app.delete("/manager/properties/:id", deleteProperty);

  app.post("/manager/properties/:id/visit", createVisit);
  app.patch("/manager/properties/:id/visit", updateVisit);
};
