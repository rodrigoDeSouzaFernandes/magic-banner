import { bannerRepository } from "./banner.repository";
import {
  Banner,
  Url,
  BannerId,
  IBannerService,
  IBannerRepository,
} from "./banner.types";

function isWithinTime(
  banner: Banner,
  timeZone: string = "America/Sao_Paulo"
): boolean {
  const startTime = banner?.startTime || "00:00";
  const endTime = banner?.endTime || "23:59";

  const now = new Date();

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone,
  });

  const [{ value: hour }, , { value: minute }] = formatter.formatToParts(now);
  const current = Number(hour) * 60 + Number(minute);

  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);

  const start = sh * 60 + sm;
  const end = eh * 60 + em;

  if (end < start) {
    return current >= start || current <= end;
  }

  return current >= start && current <= end;
}

export class BannerService implements IBannerService {
  constructor(private repository: IBannerRepository) {}

  async getByUrl(url: Url): Promise<Banner | null> {
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
