import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  price: z.number().positive("Price must be a positive number"),
});
