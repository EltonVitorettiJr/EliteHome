// biome-ignore assist/source/organizeImports: <Falso positivo do Biome na organização dos imports>
import "dotenv/config";
import type { Knex } from "knex";
import path from "node:path";

const { CONNECTION_POSTGRES_DB: postgresConnection } = process.env;

const config: Knex.Config = {
  client: "postgresql",
  connection: postgresConnection as string,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: path.join(__dirname, "src", "database", "migration"),
  },
};

export default config;
