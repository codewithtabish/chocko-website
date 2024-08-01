import { db } from "@/lib/db";
import { Warehouses } from "@/lib/schema";
import { warehouseSchema } from "@/lib/validate/warehouseSchema";

export async function POST(req: Request) {
  const data = await req.json();
  let validateData;
  try {
    validateData = await warehouseSchema.parse(data);
  } catch (error: any) {
    return Response.json({ error: error }, { status: 400 });
  }
  try {
    await db.insert(Warehouses).values({ ...validateData });
    return Response.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const allWarehouses = await db.select().from(Warehouses);
    return Response.json({ warehouses: allWarehouses }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error }, { status: 500 });
  }
}
