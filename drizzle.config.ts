import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.btolrhkepyputdovckhk:zainxyz0991122@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
  },
});
