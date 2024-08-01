import { db } from "@/lib/db";
import { Products } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("pp");
    const id = params.id;
    const data = await db
      .select()
      .from(Products)
      .where(eq(Products.id, Number(id)))
      .limit(1);
    if (data.length) {
      return Response.json({ product: data[0] }, { status: 200 });
    }
    if (!data.length) {
      return Response.json({ message: "product not found" }, { status: 404 });
    }
  } catch (error: any) {
    return Response.json({ error: "The server error is " }, { status: 500 });
  }
}
