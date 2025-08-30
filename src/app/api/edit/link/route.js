import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { url, detail, tim } = body; // destructuring nilai yang dikirim client
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id")) || 0;
  console.log(body);

  try {
    const updatedLink = await prisma.link.update({
      where: { id: parseInt(id) },
      data: {
        timId: parseInt(tim),
        link: url,
        detail: detail,
      },
    });

    return NextResponse.json({ success: true, data: updatedLink });
  } catch (error) {
    console.error("Gagal mengedit link", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengedit link." },
      { status: 500 }
    );
  }
}
