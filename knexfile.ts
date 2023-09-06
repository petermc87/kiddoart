require("dotenv").config({ path: ".env.development" });

import type { Knex } from "knex";

// Update with your config settings.
// We only need to client, connection url and migration extension (TypeScript)
const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: "ts",
  },
};

module.exports = config;
