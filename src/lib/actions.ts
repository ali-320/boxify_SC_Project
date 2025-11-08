"use server";

import { z } from "zod";

const quoteSchema = z.object({
  length: z.coerce.number().min(1, "Length is required"),
  width: z.coerce.number().min(1, "Width is required"),
  height: z.coerce.number().min(1, "Height is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  material: z.enum(["cardboard", "corrugated", "paperboard"]),
  printing: z.enum(["none", "1-color", "full-color"]),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export async function submitQuote(data: unknown) {
  const validatedFields = quoteSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors in the form.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate API call and data processing
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log("New quote request received:", validatedFields.data);

  return {
    success: true,
    message: "Thank you! Your quote request has been submitted successfully.",
  };
}
