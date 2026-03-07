import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table.boolean("is_furnished").notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table.dropColumn("is_furnished");
  });
}
