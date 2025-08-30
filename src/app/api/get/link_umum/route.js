import prisma from "@/lib/prisma"; // ✅ default import
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
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
      where: {
        tim: {
          nama: 'Semua',
        },
      },
    });

    return NextResponse.json({ success: true, data: link });
  } catch (error) {
    console.error("Gagal mengambil data tim:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data hoho.", error },
      { status: 500 }
    );
  }
}
