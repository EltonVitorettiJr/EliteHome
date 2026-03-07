import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table
      .enum("type", ["APARTMENT", "HOUSE", "TOWNHOUSE", "STUDIO"], {
        useNative: true,
        enumName: "property_type",
      })
      .notNullable()
      .defaultTo("APARTMENT");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("properties", (table) => {
    table.dropColumn("type");
  });

  await knex.schema.raw("DROP TYPE property_type");
}
