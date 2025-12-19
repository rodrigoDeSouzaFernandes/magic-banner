// Tipos específicos para o módulo admin
import { Banner, BannerId } from "@/lib/banner.types";

export type TimeInputName = "startTime" | "endTime";

export type UseBannerFormProps = {
  loadBanners: () => void;
};

export type BannerListProps = {
  banners: Banner[];
  deleteBanner: (id: BannerId) => void;
};

export type BannerFormProps = {
  loadBanners: () => void;
};

export type BannerPreviewProps = {
  image: string;
  label?: string;
};