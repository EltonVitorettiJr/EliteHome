import knexConfig from "knex";

const { CONNECTION_POSTGRES_DB: postgresConnection } = process.env;

export const knex = knexConfig({
  client: "pg",
  connection: postgresConnection as string,
  pool: {
    min: 2,
    max: 10,
  },
});
