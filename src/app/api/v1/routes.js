import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
  const body = await req.json();
  const { url, detail, tim } = body;

  try {

    const newLink = await prisma.link.create({
      data: {
        url,
        detail,
        timId: tim,
      },
    });

    return NextResponse.json({ success: true, data: newLink });
  } catch (error) {
    console.error("Gagal menambahkan link:", error);
    return NextResponse.json({ success: false, message: "Gagal menyimpan data." }, { status: 500 });
  }
}