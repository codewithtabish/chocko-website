import { db } from "@/lib/db";
import { Inventories, Products, Warehouses } from "@/lib/schema";
import { inventorySchema } from "@/lib/validate/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  let validateData;
  try {
    validateData = await inventorySchema.parse(data);
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  try {
    const response = await db.insert(Inventories).values({ ...validateData });
    return Response.json({ status: "Ok" }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const allIntevtories = await db
      .select({
        id: Inventories.id,
        sku: Inventories.sku,
        name: Warehouses.name,
        product: Products.name,
      })
      .from(Inventories)
      .leftJoin(Warehouses, eq(Inventories.warehouseId, Warehouses.id))
      .leftJoin(Products, eq(Inventories.productId, Products.id))
      .orderBy(desc(Inventories.id));
    return Response.json({ inventories: allIntevtories }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
