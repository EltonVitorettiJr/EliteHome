import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table.dropColumn("city");
    table.dropColumn("state");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table.string("city", 255).after("size");
    table.string("state", 2).after("city");
  });
}
