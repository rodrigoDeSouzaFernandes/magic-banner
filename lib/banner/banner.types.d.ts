export type BannerId = string & { readonly __brand: "BannerId" };
export type Url = string & { readonly __brand: "Url" };
export type ImageUrl = string & { readonly __brand: "ImageUrl" };
export type TimeString = string & { readonly __brand: "TimeString" };

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

export interface IBannerRepository {
  findAll(): Banner[];
  save(banner: Banner): void;
  delete(id: BannerId): boolean;
}

export interface IBannerService {
  getByUrl(url: Url): Banner | null;
  create(banner: Banner): void;
  list(): Banner[];
  remove(id: BannerId): boolean;
}

export interface IBannerApi {
  create(data: CreateBannerRequest): Promise<void>;
  list(): Promise<Banner[]>;
  delete(id: BannerId): Promise<void>;
}
