import { BannerFormData } from "../schemas/bannerSchema";
import { CreateBannerRequest, Url, ImageUrl, TimeString, IBannerApi, BannerId, Banner } from "@/lib/banner.types";

export class BannerApi implements IBannerApi {
  async create(data: CreateBannerRequest): Promise<void> {
    const res = await fetch("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error ?? "Erro ao criar banner");
    }
  }

  async list(): Promise<Banner[]> {
    const res = await fetch("/api/banners");

    if (!res.ok) {
      throw new Error("Erro ao carregar banners");
    }

    return res.json();
  }

  async delete(id: BannerId): Promise<void> {
    const res = await fetch(`/api/banners?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error ?? "Erro ao excluir banner");
    }
  }
}

export function convertFormDataToRequest(value: BannerFormData): CreateBannerRequest {
  return {
    url: value.url as Url,
    image: value.image as ImageUrl,
    startTime: value.startTime as TimeString | undefined,
    endTime: value.endTime as TimeString | undefined,
  };
}

export const bannerApi = new BannerApi();
