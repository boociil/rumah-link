// API untuk mengambil semua link dengan pagination dan pencarian

import prisma from "@/lib/prisma"; // ✅ default import
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword") || "";
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const link = await prisma.link.findMany({
      select: {
        id: true,
        detail: true,
        link: true,
        tim: {
          select: {
            nama: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
      where: keyword
        ? {
            detail: {
              contains: keyword,
              mode: "insensitive",
            },
          }
        : undefined,
      skip,
      take: limit,
    });

    return NextResponse.json({ success: true, data: link });
  } catch (error) {
    console.error("Gagal mengambil data tim:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data hoho." },
      { status: 500 }
    );
  }
}
