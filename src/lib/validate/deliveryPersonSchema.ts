import { z } from "zod";

export const deliveryPersonSchema = z.object({
  name: z.string({ message: "name should be a string" }),
  phone: z
    .string({ message: "phone should be a string" })
    .length(13, { message: "phone number must be 13 characters" }),
  warehouseId: z.number({ message: "warehouseId should be a number" }),
});
