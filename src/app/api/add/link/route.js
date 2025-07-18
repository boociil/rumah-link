import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {

  const body = await req.json();
  const { url, detail, tim } = body; // destructuring nilai yang dikirim client
  console.log(body);
  


  try {
    const createLink = await prisma.link.create({
      data: {
        timId : parseInt(tim),
        link : url,
        detail : detail,
      },
    });

    return NextResponse.json({ success: true, data: createLink });
  } catch (error) {
    console.error("Gagal membuat link", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat link." },
      { status: 500 }
    );
  }
}
