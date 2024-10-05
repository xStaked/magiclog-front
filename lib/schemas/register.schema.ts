import { z } from "zod";
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, {
        message: "Username must be at least 3 characters long.",
      })
      .max(20),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
