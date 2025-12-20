import { supabaseServer } from "@/lib/supabase/server";
import { Banner, BannerId, IBannerRepository } from "./banner.types";

export class SupabaseBannerRepository implements IBannerRepository {
  async findAll(): Promise<Banner[]> {
    const { data, error } = await supabaseServer.from("banners").select("*");

    if (error) {
      throw error;
    }

    return data as Banner[];
  }

  async save(banner: Banner): Promise<void> {
    const { error } = await supabaseServer.from("banners").insert(banner);

    if (error) {
      throw error;
    }
  }

  async delete(id: BannerId): Promise<boolean> {
    const { error, count } = await supabaseServer
      .from("banners")
      .delete({ count: "exact" })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return (count ?? 0) > 0;
  }
}

export const bannerRepository = new SupabaseBannerRepository();
