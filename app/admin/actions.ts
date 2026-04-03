"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProperty(formData: FormData) {
  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;

  await prisma.property.create({
    data: {
      title,
      location,
      price,
      description,
      status: "VERIFIED",
    },
  });

  revalidatePath("/admin"); // Refresh the admin page data
}