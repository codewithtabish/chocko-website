import { db } from "@/lib/db";
import { DeliveryPerson, Warehouses } from "@/lib/schema";
import { deliveryPersonSchema } from "@/lib/validate/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  let validateData;
  try {
    validateData = await deliveryPersonSchema.parse(data);
  } catch (error: any) {
    return Response.json({ error: error }, { status: 400 });
  }
  try {
    const deliveryPerson = await db
      .insert(DeliveryPerson)
      .values({ ...validateData });
    return Response.json({ status: "Ok" }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const allDeliveryPerson = await db
      .select({
        id: DeliveryPerson.id,
        name: DeliveryPerson.name,
        phone: DeliveryPerson.phone,
        warehouse: Warehouses.name,
      })
      .from(DeliveryPerson)
      .leftJoin(Warehouses, eq(DeliveryPerson.warehouseId, Warehouses.id))
      .orderBy(desc(DeliveryPerson.id));
    return Response.json(
      { deliveryPerson: allDeliveryPerson },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
