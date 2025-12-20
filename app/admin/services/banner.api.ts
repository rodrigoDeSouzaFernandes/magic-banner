import {
  CreateBannerRequest,
  IBannerApi,
  BannerId,
  Banner,
} from "@/lib/banner/banner.types";

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

export const bannerApi = new BannerApi();
