import { bannerRepository } from "./banner.repository";
import {
  Banner,
  Url,
  BannerId,
  IBannerService,
  IBannerRepository,
} from "./banner.types";

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

  async getByUrl(url: Url): Promise<Banner | null> {
    console.log("buscando banner por url:", url);
    const banner = await (this.repository as any).findByUrl(url);
    if (!banner) return null;

    return isWithinTime(banner) ? banner : null;
  }

  async create(banner: Banner): Promise<void> {
    await this.repository.save(banner);
  }

  async list(): Promise<Banner[]> {
    return this.repository.findAll();
  }

  async remove(id: BannerId): Promise<boolean> {
    return this.repository.delete(id);
  }
}

export const bannerService = new BannerService(bannerRepository);
