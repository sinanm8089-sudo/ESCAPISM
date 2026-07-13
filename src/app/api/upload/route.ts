import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

const categories = ["mountains", "camping", "nature", "sunsets", "travel", "food", "people", "homestays"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const savedMemories = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, "_")}`;
      
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filepath = path.join(uploadDir, filename);

      // Write file to public/uploads
      await writeFile(filepath, buffer);

      // Create database record
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      const memory = await prisma.memory.create({
        data: {
          src: `/uploads/${filename}`,
          title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
          category,
          location: "Your Journey",
          date: new Date().toISOString().split("T")[0],
          width: 800,
          height: 600 + Math.floor(Math.random() * 400),
        },
      });

      savedMemories.push({
        ...memory,
        tags: [memory.category, "uploaded", "travel"],
        likes: 0,
        isLiked: false,
        tripId: "trip-uploaded",
        reactions: { love: 0, amazing: 0, adventure: 0 },
        comments: [],
      });
    }

    return NextResponse.json(savedMemories, { status: 201 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
