import { BannerFormData } from "../schemas/bannerSchema";

export const bannerApi = {
  create: async function (value: BannerFormData) {
    await fetch("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: value.url,
        image: value.image,
        startTime: value.startTime || undefined,
        endTime: value.endTime || undefined,
      }),
    });
  },
};
