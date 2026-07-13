import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map Prisma schema to Frontend schema
    const formattedMemories = memories.map((m) => ({
      ...m,
      tags: [m.category, "uploaded", "travel"],
      likes: 0,
      isLiked: false,
      tripId: "trip-uploaded",
      reactions: { love: 0, amazing: 0, adventure: 0 },
      comments: [],
    }));

    return NextResponse.json(formattedMemories);
  } catch (error) {
    console.error("Failed to fetch memories:", error);
    return NextResponse.json({ error: "Failed to fetch memories" }, { status: 500 });
  }
}
