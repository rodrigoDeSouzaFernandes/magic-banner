import { BannerFormData } from "../schemas/bannerSchema";
import { CreateBannerRequest, Url, ImageUrl, TimeString, IBannerApi } from "@/lib/banner.types";

export class BannerApi implements IBannerApi {
  async create(data: CreateBannerRequest): Promise<Response> {
    return await fetch("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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
