import { z } from "zod";

export const inventorySchema = z.object({
  sku: z
    .string({ message: "sku must be string" })
    .length(8, "sku must be an 8 number"),
  productId: z.number({ message: "productId must be a number" }),
  warehouseId: z.number({ message: "warehouseId must be a number" }),
});
