
"use server";

import { z } from "zod";
import { initializeFirebase } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

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
  companyName: z.string().optional(),
  streetAddress: z.string().min(2, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(2, "ZIP Code is required"),
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

  const { firestore } = initializeFirebase();
  const quoteCollection = collection(firestore, "quoteRequests");

  try {
    const { length, width, height, ...rest } = validatedFields.data;
    await addDoc(quoteCollection, {
      ...rest,
      productDimensions: `${length}x${width}x${height}`,
      submissionDate: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Thank you! Your quote request has been submitted successfully.",
    };
  } catch (error) {
    console.error("Error submitting quote:", error);
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
