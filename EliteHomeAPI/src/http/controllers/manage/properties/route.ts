import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../../middleware/verify-jwt";
import { create } from "./create";
import { createVisit } from "./create-visit";
import { deleteProperty } from "./delete-property";
import { deletePropertyImage } from "./delete-property-image";
import { deleteVisit } from "./delete-visit";
import { findById } from "./find-by-id";
import { findOneVisit } from "./find-one-visit";
import { findPropertyImages } from "./find-property-images";
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
  app.get("/manager/properties/:propertyId", findById);
  app.patch("/manager/properties/:propertyId", update);
  app.delete("/manager/properties/:propertyId", deleteProperty);

  //Visits routes
  app.post("/manager/properties/:propertyId/visit", createVisit);
  app.patch("/manager/properties/:propertyId/visit/:visitId", updateVisit);
  app.get("/manager/properties/:propertyId/search-visits", searchVisits);
  app.get("/manager/properties/:propertyId/visit/:visitId", findOneVisit);
  app.delete("/manager/properties/:propertyId/visit/:visitId", deleteVisit);

  //Property images routes
  app.get("/manager/properties/:propertyId/images", findPropertyImages);
  app.post("/manager/properties/:propertyId/images", uploadPropertyImages);
  app.delete(
    "/manager/properties/:propertyId/images/:imageId",
    deletePropertyImage,
  );
};
