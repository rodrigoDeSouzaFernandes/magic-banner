import { Banner, BannerId, CreateBannerRequest } from "@/lib/banner/banner.types";
import { useEffect, useState } from "react";
import { bannerApi } from "../services/banner.api";
import { toast } from "sonner";

export const useAdminPage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  const [bannerListLoading, setBannerListLoading] = useState<boolean>(true);

  async function loadBanners() {
    setBannerListLoading(true);
    try {
      const data: Banner[] = await bannerApi.list();
      setBanners(data);
    } catch (error) {
      toast.error("Erro ao carregar banners");
    } finally {
      setBannerListLoading(false);
    }
  }

  useEffect(() => {
    loadBanners();
  }, []);

  async function deleteBanner(id: BannerId) {
    try {
      await bannerApi.delete(id);
      toast.success("Banner excluído com sucesso");
      loadBanners();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao exclur banner, tente novamente mais tarde");
      }
    }
  }

  async function createBanner(requestData: CreateBannerRequest) {
    await bannerApi
      .create(requestData)
      .then(async () => {
        await loadBanners();
        toast.success("Banner criado com sucesso");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return {
    banners,
    bannerListLoading,
    loadBanners,
    deleteBanner,
    createBanner
  };
};
