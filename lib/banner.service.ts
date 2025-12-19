import { Banner, Url, BannerId, IBannerService, IBannerRepository } from "./banner.types";
import { bannerRepository } from "./banner.repository";

function isWithinTime(banner: Banner): boolean {
  if (!banner.startTime || !banner.endTime) return true;

  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();

  const [sh, sm] = banner.startTime.split(":").map(Number);
  const [eh, em] = banner.endTime.split(":").map(Number);

  const start = sh * 60 + sm;
  const end = eh * 60 + em;

  return current >= start && current <= end;
}

export class BannerService implements IBannerService {
  constructor(private repository: IBannerRepository) {}

  getByUrl(url: Url): Banner | null {
    const banners = this.repository.findAll();
    return banners.find(b => b.url === url && isWithinTime(b)) ?? null;
  }

  create(banner: Banner): void {
    this.repository.save(banner);
  }

  list(): Banner[] {
    return this.repository.findAll();
  }

  remove(id: BannerId): boolean {
    return this.repository.delete(id);
  }
}

export const bannerService = new BannerService(bannerRepository);
