import "dotenv/config";
import fastify from "fastify";
import { baseRoutes } from "./controllers/base/route";
import { propertiesRoutes } from "./controllers/properties/route";

export const app = fastify();

app.register(baseRoutes);
app.register(propertiesRoutes);

//TODO criar um handler global de erros
//TODO criar conexão com banco de dados
