import { Knex } from "knex";

// Populate the migrations with the schema in prisma.
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("images", (table) => {
    table.string("id", 25).primary();
    table.string("prompt", 100).notNullable();
    table.string("url", 10000).notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now()).index();
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("images");
}
