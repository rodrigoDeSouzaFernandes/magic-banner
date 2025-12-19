import { BannerFormData } from "../schemas/bannerSchema";
import { CreateBannerRequest, Url, ImageUrl, TimeString } from "@/lib/banner.types";

export const bannerApi = {
  create: async function (value: BannerFormData) {
    const requestData: CreateBannerRequest = {
      url: value.url as Url,
      image: value.image as ImageUrl,
      startTime: value.startTime as TimeString | undefined,
      endTime: value.endTime as TimeString | undefined,
    };

    return await fetch("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
  },
};
