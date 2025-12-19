export type BannerId = string & { readonly __brand: "BannerId" };
export type Url = string & { readonly __brand: "Url" };
export type ImageUrl = string & { readonly __brand: "ImageUrl" };
export type TimeString = string & { readonly __brand: "TimeString" }; // Formato HH:MM

export interface Banner {
  id: BannerId;
  url: Url;
  image: ImageUrl;
  startTime?: TimeString;
  endTime?: TimeString;
}

export interface CreateBannerRequest {
  url: Url;
  image: ImageUrl;
  startTime?: TimeString;
  endTime?: TimeString;
}

export type BannerResponse = Banner;

export interface ApiError {
  error: string;
  status: number;
}

export type BannerWithoutId = Omit<Banner, "id">;
export type PartialBanner = Partial<Banner>;
