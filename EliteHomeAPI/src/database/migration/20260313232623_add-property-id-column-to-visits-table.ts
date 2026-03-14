import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("visits", (table) => {
    table
      .uuid("property_id")
      .references("id")
      .inTable("properties")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("visits", (table) => {
    table.dropForeign("property_id");
    table.dropColumn("property_id");
  });
}
