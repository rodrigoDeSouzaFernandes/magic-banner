export type BannerId = string & { readonly __brand: "BannerId" };
export type Url = string & { readonly __brand: "Url" };
export type ImageUrl = string & { readonly __brand: "ImageUrl" };
export type TimeString = string & { readonly __brand: "TimeString" };

export interface Banner {
  id: BannerId;
  url: Url;
  image: ImageUrl;
  startTime?: TimeString | null;
  endTime?: TimeString | null;
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
  findAll(): Promise<Banner[]>;
  save(banner: Banner): Promise<void>;
  delete(id: BannerId): Promise<boolean>;
}

export interface IBannerService {
  getByUrl(url: Url): Promise<Banner | null>;
  create(banner: Banner): Promise<void>;
  list(): Promise<Banner[]>;
  remove(id: BannerId): Promise<boolean>;
}

export interface IBannerApi {
  create(data: CreateBannerRequest): Promise<void>;
  list(): Promise<Banner[]>;
  delete(id: BannerId): Promise<void>;
}
