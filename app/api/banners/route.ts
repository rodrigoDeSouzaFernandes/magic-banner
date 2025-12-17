import { NextResponse } from "next/server";
import { bannerService } from "@/lib/banner.service";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      bannerService.list()
    );
  }

  return NextResponse.json(
    bannerService.getByUrl(url)
  );
}

export async function POST(request: Request) {
  const body = await request.json();

  bannerService.create({
    id: randomUUID(),
    ...body
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) bannerService.remove(id);

  return NextResponse.json({ ok: true });
}
