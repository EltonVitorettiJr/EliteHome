import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table.string("address").notNullable().defaultTo("");
    table.decimal("latitude").notNullable().defaultTo(0);
    table.decimal("longitude").notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table.dropColumn("address");
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
}
