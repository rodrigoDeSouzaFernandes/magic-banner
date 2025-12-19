import { NextResponse } from "next/server";
import { bannerService } from "@/lib/banner.service";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      const allBanners = bannerService.list();
      return NextResponse.json(allBanners);
    }

    const banner = bannerService.getByUrl(url);
    if (!banner) {
      return NextResponse.json(
        { error: `Nenhum banner encontrado para a URL: ${url}` },
        { status: 404 }
      );
    }

    return NextResponse.json(banner);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Ocorreu um erro ao buscar o banner" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.url || !body.image) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: url e image" },
        { status: 400 }
      );
    }

    bannerService.create({
      id: randomUUID(),
      ...body,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Ocorreu um erro ao criar o banner" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatório para remover o banner" },
        { status: 400 }
      );
    }

    const removed = bannerService.remove(id);
    if (!removed) {
      return NextResponse.json(
        { error: `Banner com ID ${id} não encontrado` },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Ocorreu um erro ao remover o banner" },
      { status: 500 }
    );
  }
}
