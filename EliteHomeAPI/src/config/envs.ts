import "dotenv/config";
import * as env from "env-var";

export const envs = {
  CONNECTION_POSTGRES_DB: env
    .get("CONNECTION_POSTGRES_DB")
    .required()
    .asString(),
  NODE_ENV: env.get("NODE_ENV").default("development").asString(),
  APP_PORT: env.get("APP_PORT").default(4000).asIntPositive(),
};
