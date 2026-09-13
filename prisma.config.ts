import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },

  // The datasource is supplied only when DATABASE_URL is actually set.
  //
  // This used to be `url: env("DATABASE_URL")`, and prisma/config's env() throws
  // at config-load time when the variable is absent - before any command runs.
  // The build only ever runs `prisma generate`, which reads the schema and emits
  // a client; it never opens a connection and does not need a URL. So the old
  // form failed every build that did not carry a database credential, for a
  // value that build had no use for - and the fix for that is not to hand the
  // credential to the builder, it is to stop demanding it.
  //
  // Commands that DO connect (migrate, db push, studio) still work wherever
  // DATABASE_URL is set, and fail with Prisma's own "no datasource" error rather
  // than a confusing config-load crash where it is not.
  ...(process.env.DATABASE_URL
    ? { datasource: { url: process.env.DATABASE_URL } }
    : {}),
});
