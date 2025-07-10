import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const tim = await prisma.tim.findMany({
      select: {
        id: true,
        nama: true,
        links: {
          select: {
            detail: true,
            link: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({ success: true, data: tim });
  } catch (error) {
    console.error("Gagal mengambil data tim:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data hoho." },
      { status: 500 }
    );
  }
}
