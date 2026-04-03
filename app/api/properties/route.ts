import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This tells Next.js to always fetch fresh data and not cache the mock data
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch all properties from your Neon Database via Prisma
    const properties = await prisma.property.findMany({
      orderBy: { 
        createdAt: 'desc' 
      },
    });

    // 2. Return the real data to your Manage page
    return NextResponse.json(properties);
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" }, 
      { status: 500 }
    );
  }
}