import fastify from "fastify";
import { baseRoutes } from "./controller/base/route";

export const app = fastify();

app.register(baseRoutes);
