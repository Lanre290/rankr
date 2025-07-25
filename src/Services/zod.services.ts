import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(/^[A-Za-z\s'-]+$/, "Username must only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export const createRankrSchema = z.object({
  person_one_name: z.string().min(1, "Person one name is required"),
  person_two_name: z.string().min(1, "Person two name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  expiresAt: z
    .string()
    .regex(/^(\d+)([dh])$/, "Invalid expiry date format")
    .optional(),
  is_public: z.boolean().optional(),
})