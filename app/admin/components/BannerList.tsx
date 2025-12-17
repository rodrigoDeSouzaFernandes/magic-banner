import { Banner } from "@/lib/banner.types";
import React from "react";

type BannerListProps = {
  banners: Banner[];
  deleteBanner: (id: string) => void;
};

export default function BannerList({ banners, deleteBanner }: BannerListProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-medium">Banners cadastrados</h2>

      <div className="space-y-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{banner.url}</p>
              <p className="text-xs text-gray-500">
                {banner.startTime && banner.endTime
                  ? `Visível das ${banner.startTime} às ${banner.endTime}`
                  : "Sempre visível"}
              </p>
            </div>

            <button
              onClick={() => deleteBanner(banner.id)}
              className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
            >
              Excluir
            </button>
          </div>
        ))}

        {banners.length === 0 && (
          <p className="text-sm text-gray-500">Nenhum banner cadastrado.</p>
        )}
      </div>
    </section>
  );
}
