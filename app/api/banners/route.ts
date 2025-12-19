import { NextResponse } from "next/server";
import { bannerService } from "@/lib/banner.service";
import { randomUUID } from "crypto";
import { corsHeaders } from "@/lib/cors";

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
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(banner, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Ocorreu um erro ao buscar o banner" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.url || !body.image) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: url e image" },
        { status: 400, headers: corsHeaders }
      );
    }

    bannerService.create({
      id: randomUUID(),
      ...body,
    });

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Ocorreu um erro ao criar o banner" },
      { status: 500, headers: corsHeaders }
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
        { status: 400, headers: corsHeaders }
      );
    }

    const removed = bannerService.remove(id);
    if (!removed) {
      return NextResponse.json(
        { error: `Banner com ID ${id} não encontrado` },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Ocorreu um erro ao remover o banner" },
      { status: 500, headers: corsHeaders }
    );
  }
}
