import prisma from "@/lib/prisma"; // ✅ default import
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id")) || 0;

    const link = await prisma.link.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true, data: link });
  } catch (error) {
    console.error("Gagal menghapus link:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus link hoho." },
      { status: 500 }
    );
  }
}
