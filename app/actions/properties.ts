"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * HELPER: Converts "N 250M" or "700,000,000" into a clean Number (Float/Int)
 */
function cleanPrice(priceInput: any): number {
  if (typeof priceInput === 'number') return priceInput;
  if (!priceInput) return 0;

  // 1. Remove N, ₦, commas, and spaces
  let cleaned = priceInput.toString().replace(/[₦N, ]/g, '').toLowerCase().trim();
  
  // 2. Extract the base number
  let value = parseFloat(cleaned);
  
  // 3. Scale based on Million (M) or Billion (B)
  if (cleaned.includes('m')) value *= 1_000_000;
  if (cleaned.includes('b')) value *= 1_000_000_000;
  
  return isNaN(value) ? 0 : value;
}

/**
 * ACTION: Save a new property from the Capture Engine
 */
export async function saveProperty(data: any) {
  try {
    const property = await prisma.property.create({
      data: {
        title: data.title,
        price: cleanPrice(data.price), // 👈 Uses the new smart formatter
        location: data.location,
        description: data.description,
        videoUrl: data.videoUrl || "",
        images: data.images || [], 
        status: data.status || "TIER_1_PENDING",
        views: 0, // Explicitly start at zero
      }
    });

    revalidatePath('/');
    revalidatePath('/admin/capture');
    return { success: true, id: property.id };
  } catch (error: any) {
    console.error("❌ NEON SAVE ERROR:", error);
    return { 
      success: false, 
      error: error.message || "Database write failed." 
    };
  }
}

/**
 * ACTION: Track a WhatsApp Click/View
 */
export async function trackPropertyClick(id: string) {
  try {
    // Basic check to ensure ID exists
    if (!id) return { success: false };

    await prisma.property.update({
      where: { id },
      data: { 
        views: { increment: 1 } 
      },
    });

    // Revalidate so the admin dashboard or details page shows updated stats
    revalidatePath(`/property/${id}`);
    return { success: true };
  } catch (error) {
    console.error("❌ CLICK TRACK ERROR:", error);
    return { success: false };
  }
}

/**
 * ACTION: Delete a Property (Required for Admin cleanup)
 */
export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({
      where: { id }
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}