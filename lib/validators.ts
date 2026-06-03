import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(6).optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, "Full name is required"),
  confirmPassword: z.string().min(6).optional(),
});

export const setupBusinessSchema = z.object({
  country: z.string().min(1, "Country is required"),
  businessType: z.string().min(1, "Business type is required"),
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type SetupBusinessFormValues = z.infer<typeof setupBusinessSchema>;
