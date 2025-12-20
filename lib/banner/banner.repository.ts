import { supabaseServer } from "@/lib/supabase/server";
import { Banner, BannerId, IBannerRepository, Url } from "./banner.types";

export class SupabaseBannerRepository implements IBannerRepository {
  async findAll(): Promise<Banner[]> {
    const { data, error } = await supabaseServer.from("banners").select("*");

    if (error) {
      throw error;
    }

    return data as Banner[];
  }

  async findByUrl(url: Url): Promise<Banner | null> {
    const { data, error } = await supabaseServer
      .from("banners")
      .select("*")
      .eq("url", url)
      .limit(1)
      .single();

    if (error) {
      console.error("Erro ao buscar banner pelo URL:", error);
      return null;
    }

    if (!data) return null;

    return data as Banner;
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
