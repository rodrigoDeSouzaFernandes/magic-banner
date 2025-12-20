import { NextResponse } from "next/server";
import { bannerService as service } from "@/lib/banner/banner.service";
import { randomUUID } from "crypto";
import { corsHeaders } from "@/lib/cors";
import { BannerId, CreateBannerRequest } from "@/lib/banner/banner.types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const urlParam = searchParams.get("url");

    if (!urlParam) {
      const banners = await service.list();
      return NextResponse.json(banners, { headers: corsHeaders });
    }

    const banner = await service.getByUrl(urlParam as any);
    if (!banner) {
      return NextResponse.json(
        { error: "Nenhum banner encontrado", status: 404 },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(banner, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao buscar banner", status: 500 },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateBannerRequest = await request.json();

    if (!body.url || !body.image) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes", status: 400 },
        { status: 400, headers: corsHeaders }
      );
    }

    await service.create({
      id: randomUUID() as BannerId,
      startTime: body.startTime || null,
      endTime: body.endTime || null,
      url: body.url,
      image: body.image,
    });

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error("erro no post", err);
    return NextResponse.json(
      { error: "Erro ao criar banner", status: 500 },
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
        { error: "ID obrigatório", status: 400 },
        { status: 400, headers: corsHeaders }
      );
    }

    const removed = await service.remove(id as BannerId);
    if (!removed) {
      return NextResponse.json(
        { error: "Banner não encontrado", status: 404 },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao remover banner", status: 500 },
      { status: 500, headers: corsHeaders }
    );
  }
}
