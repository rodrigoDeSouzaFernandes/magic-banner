import { Banner, BannerId, CreateBannerRequest } from "@/lib/banner.types";

export type TimeInputName = "startTime" | "endTime";

export type UseBannerFormProps = {
  onSubmitForm: (data: CreateBannerRequest) => Promise<void>;
};

export type BannerListProps = {
  banners: Banner[];
  deleteBanner: (id: BannerId) => void;
};

export type BannerFormProps = {
  onSubmitForm: (data: CreateBannerRequest) => Promise<void>;
};

export type BannerPreviewProps = {
  image: string;
  label?: string;
};

export type BannerCardProps = {
  banner: Banner;
  deleteBanner: (id: BannerId) => void;
};
