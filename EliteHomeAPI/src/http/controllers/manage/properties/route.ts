import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../../middleware/verify-jwt";
import { create } from "./create";
import { createVisit } from "./create-visit";
import { deleteProperty } from "./delete-property";
import { deleteVisit } from "./delete-visit";
import { findById } from "./find-by-id";
import { findOneVisit } from "./find-one-visit";
import { search } from "./search";
import { searchVisits } from "./search-visits";
import { update } from "./update";
import { updateVisit } from "./update-visit";
import { uploadPropertyImages } from "./upload-property-images";

export const managersPropertiesRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);

  //Properties routes
  app.post("/manager/properties", create);
  app.get("/manager/properties", search);
  app.get("/manager/properties/:id", findById);
  app.patch("/manager/properties/:id", update);
  app.delete("/manager/properties/:id", deleteProperty);

  //Visits routes
  app.post("/manager/properties/:id/visit", createVisit);
  app.patch("/manager/properties/:id/visit", updateVisit);
  app.get("/manager/properties/:id/search-visits", searchVisits);
  app.get("/manager/properties/:id/visit", findOneVisit);
  app.delete("/manager/properties/:id/visit", deleteVisit);

  // Rota de Upload de Imagens
  app.post("/manager/properties/:id/images", uploadPropertyImages);
};
