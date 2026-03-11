import knexConfig from "knex";
import { envs } from "../config/envs";

export const knex = knexConfig({
  client: "pg",
  connection: envs.CONNECTION_POSTGRES_DB,
  pool: {
    min: 2,
    max: 10,
  },
});
