import { Banner, Url, BannerId } from "./banner.types";
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

export const bannerService = {
  getByUrl(url: Url): Banner | null {
    const banners = bannerRepository.findAll();
    return banners.find(b => b.url === url && isWithinTime(b)) ?? null;
  },

  create(banner: Banner) {
    bannerRepository.save(banner);
  },

  list(): Banner[] {
    return bannerRepository.findAll();
  },

  remove(id: BannerId): boolean {
    return bannerRepository.delete(id);
  }
};
