import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("visits", (table) => {
    table.dropColumn("type");
  });

  await knex.schema.raw("DROP TYPE visit_status");

  return knex.schema.alterTable("visits", (table) => {
    table
      .enum("visit_status", ["INTEREST", "CONFIRMED", "COMPLETED", "CANCELLED"], {
        useNative: true,
        enumName: "visit_status",
      })
      .notNullable()
      .defaultTo("INTEREST");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("visits", (table) => {
    table.dropColumn("visit_status");
  });

  await knex.schema.raw("DROP TYPE visit_status");

  return knex.schema.alterTable("visits", (table) => {
    table
      .enum("type", ["INTEREST", "CONFIRMED", "COMPLETED", "CANCELLED"], {
        useNative: true,
        enumName: "visit_status",
      })
      .notNullable()
      .defaultTo("INTEREST");
  });
}
