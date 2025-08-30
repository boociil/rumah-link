import prisma from "@/lib/prisma"; // ✅ default import
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id")) || 0;

    const link = await prisma.link.findMany({
      select: {
        id: true,
        detail: true,
        link: true,

      },
      orderBy: {
        id: "asc",
      },
      where: {
        tim: {
          id: id,
        },
      }
    });

    const tim = await prisma.tim.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true, data: link, tim: tim });
  } catch (error) {
    console.error("Gagal mengambil data tim:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data hoho." },
      { status: 500 }
    );
  }
}
