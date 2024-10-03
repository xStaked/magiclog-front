import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .max(254),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 8 characters long.",
    })
    .max(254),
});
