import type { FastifyInstance } from "fastify";
import { info } from "./info";

export const baseRoutes = async (app: FastifyInstance) => {
  app.get("/", info);
};
