import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("properties", (table) => {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });

  return knex.schema.alterTable("properties", (table) => {
    table.decimal("latitude", 14, 11).notNullable().defaultTo(0);
    table.decimal("longitude", 14, 11).notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("properties", (table) => {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });

  return knex.schema.alterTable("properties", (table) => {
    table.decimal("latitude").notNullable().defaultTo(0);
    table.decimal("longitude").notNullable().defaultTo(0);
  });
}
