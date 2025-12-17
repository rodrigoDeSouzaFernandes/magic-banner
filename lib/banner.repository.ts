import { Banner } from "./banner.types";
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

export const bannerRepository = {
  findAll(): Banner[] {
    return readFile();
  },

  save(banner: Banner) {
    const banners = readFile();
    banners.push(banner);
    writeFile(banners);
  },

  delete(id: string) {
    const banners = readFile().filter(b => b.id !== id);
    writeFile(banners);
  }
};
