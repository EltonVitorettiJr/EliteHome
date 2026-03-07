import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table.integer("rent_value").notNullable().defaultTo(0);
    table.integer("condo_value").notNullable().defaultTo(0);
    table.integer("tax_value").notNullable().defaultTo(0);
    table.integer("number_of_bathrooms").notNullable().defaultTo(0);
    table.integer("garage_slots").notNullable().defaultTo(0);
    table.boolean("are_pets_allowed").notNullable().defaultTo(true);
    table.boolean("is_next_to_subway").notNullable().defaultTo(false);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.text("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("properties", (table) => {
    table.dropColumn("rent_value");
    table.dropColumn("condo_value");
    table.dropColumn("tax_value");
    table.dropColumn("number_of_bathrooms");
    table.dropColumn("garage_slots");
    table.dropColumn("are_pets_allowed");
    table.dropColumn("is_next_to_subway");
    table.dropColumn("is_active");
    table.dropColumn("description");
  });
}
