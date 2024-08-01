import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryString = process.env.DATABASE_URL as string;
console.log(queryString);

export const connection = postgres(
  "postgresql://postgres.btolrhkepyputdovckhk:zainxyz0991122@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
);
export const db = drizzle(connection);

// zain@@##9988A
// ;
