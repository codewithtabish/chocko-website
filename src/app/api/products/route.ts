import { db } from "@/lib/db";
import { Products } from "@/lib/schema";
import { productSchema } from "@/lib/validate/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(req: Request, res: Response) {
  const data = await req.formData();
  let validateData;
  try {
    validateData = await productSchema.parse({
      name: data.get("name"),
      image: data.get("image"),
      description: data.get("description"),
      price: Number(data.get("price")),
    });
  } catch (e: any) {
    return Response.json({ status: 400, message: e });
  }
  const fileName = `${Date.now()}.${validateData.image.name
    .split(".")
    .slice(-1)}`;
  try {
    const buffer = Buffer.from(await validateData.image.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "/public/assets", fileName),
      buffer
    );
  } catch (error) {
    return Response.json({
      message: "failed to save the file",
      stausCode: 500,
    });
  }
  try {
    await db.insert(Products).values({ ...validateData, image: fileName });
  } catch (error) {
    return Response.json(
      { message: "failed to save the product into database" },
      { status: 500 }
    );
  }

  return Response.json(
    {
      message: "Ok",
    },
    { status: 201 }
  );
}

export async function GET(req: Request) {
  try {
    const data = await db.select().from(Products).orderBy(desc(Products.id));
    return Response.json({ products: data }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
