// biome-ignore assist/source/organizeImports: <Falso positivo na organização dos imports no biome>
import type { Knex } from "knex";
import path from "node:path";
import { envs } from "./src/config/envs";

const config: Knex.Config = {
  client: "postgresql",
  connection: envs.CONNECTION_POSTGRES_DB,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: path.join(__dirname, "src", "database", "migration"),
  },
  seeds: {
    directory: "./src/database/seed",
  },
};

export default config;
