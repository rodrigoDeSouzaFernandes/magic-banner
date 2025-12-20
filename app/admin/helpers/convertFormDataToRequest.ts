import {
  CreateBannerRequest,
  ImageUrl,
  TimeString,
  Url,
} from "@/lib/banner.types";
import { BannerFormData } from "../schemas/bannerSchema";

export function convertFormDataToRequest(
  value: BannerFormData
): CreateBannerRequest {
  return {
    url: value.url as Url,
    image: value.image as ImageUrl,
    startTime: value.startTime as TimeString | undefined,
    endTime: value.endTime as TimeString | undefined,
  };
}
