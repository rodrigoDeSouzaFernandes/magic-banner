import { NextResponse } from "next/server";
import { bannerService } from "@/lib/banner/banner.service";
import { randomUUID } from "crypto";
import { corsHeaders } from "@/lib/cors";
import { Url, BannerId, CreateBannerRequest, ApiError } from "@/lib/banner/banner.types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const urlParam = searchParams.get("url");

    if (!urlParam) {
      const allBanners = bannerService.list();
      return NextResponse.json(allBanners, { headers: corsHeaders });
    }

    const banner = bannerService.getByUrl(urlParam as Url);
    if (!banner) {
      const error: ApiError = { error: `Nenhum banner encontrado para a URL: ${urlParam}`, status: 404 };
      return NextResponse.json(error, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json(banner, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    const error: ApiError = { error: "Ocorreu um erro ao buscar o banner", status: 500 };
    return NextResponse.json(error, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateBannerRequest = await request.json();

    if (!body.url || !body.image) {
      const error: ApiError = { error: "Campos obrigatórios ausentes: url e image", status: 400 };
      return NextResponse.json(error, { status: 400, headers: corsHeaders });
    }

    bannerService.create({
      id: randomUUID() as BannerId,
      ...body,
    });

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    const error: ApiError = { error: "Ocorreu um erro ao criar o banner", status: 500 };
    return NextResponse.json(error, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      const error: ApiError = { error: "ID obrigatório para remover o banner", status: 400 };
      return NextResponse.json(error, { status: 400, headers: corsHeaders });
    }

    const removed = bannerService.remove(idParam as BannerId);
    if (!removed) {
      const error: ApiError = { error: `Banner com ID ${idParam} não encontrado`, status: 404 };
      return NextResponse.json(error, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    const error: ApiError = { error: "Ocorreu um erro ao remover o banner", status: 500 };
    return NextResponse.json(error, { status: 500, headers: corsHeaders });
  }
}
