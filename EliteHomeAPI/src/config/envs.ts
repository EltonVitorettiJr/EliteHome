import "dotenv/config";
import * as env from "env-var";

export const envs = {
  CONNECTION_POSTGRES_DB: env
    .get("CONNECTION_POSTGRES_DB")
    .required()
    .asString(),
  NODE_ENV: env.get("NODE_ENV").default("development").asString(),
  APP_PORT: env.get("APP_PORT").default(4000).asIntPositive(),
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),
  EXPIRES_IN_JWT: env.get("EXPIRES_IN_JWT").default("5d").asString(),
  AWS_REGION: env.get("AWS_REGION").default("us-east-1").asString(),
  AWS_ACCESS_KEY_ID: env.get("AWS_ACCESS_KEY_ID").default("docker").asString(),
  AWS_SECRET_ACCESS_KEY: env
    .get("AWS_SECRET_ACCESS_KEY")
    .default("dockerroot")
    .asString(),
  AWS_ENDPOINT_URL: env
    .get("AWS_ENDPOINT_URL")
    .default("http://localhost:9000")
    .asString(),
};
