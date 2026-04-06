"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProperty(formData: FormData) {
  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const priceString = formData.get("price") as string;
  const description = formData.get("description") as string;

  // Convert price to a number
  const price = Number(priceString);

  // Optional: Validate price
  if (isNaN(price)) {
    throw new Error("Price must be a number");
  }

  await prisma.property.create({
    data: {
      title,
      location,
      price, // now it's a number
      description,
      status: "VERIFIED",
    },
  });

  // Refresh the admin page data
  revalidatePath("/admin");
}