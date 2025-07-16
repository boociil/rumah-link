import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const getAllTim = await prisma.tim.findMany({
      select: {
        id: true,
        nama: true,
      },
      orderBy: {
        id: 'asc', // atau 'desc'
      },
    });

    return NextResponse.json({ success: true, data: getAllTim });
  } catch (error) {
    console.error("Gagal mengambil data tim:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data hehe." },
      { status: 500 }
    );
  }
}
