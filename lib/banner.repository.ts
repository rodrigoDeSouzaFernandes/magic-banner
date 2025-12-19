import { Banner, BannerId, IBannerRepository } from "./banner.types";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "banners.json");

function readFile(): Banner[] {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeFile(data: Banner[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export class JsonBannerRepository implements IBannerRepository {
  findAll(): Banner[] {
    return readFile();
  }

  save(banner: Banner): void {
    const banners = readFile();
    banners.push(banner);
    writeFile(banners);
  }

  delete(id: BannerId): boolean {
    const banners = readFile();
    const filtered = banners.filter((b) => b.id !== id);

    if (filtered.length === banners.length) {
      return false;
    }

    writeFile(filtered);
    return true;
  }
}

export const bannerRepository = new JsonBannerRepository();
