import { BannerListProps } from "../types";
import BannerCard from "./BannerCard";

export default function BannerList({ banners, deleteBanner }: BannerListProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium text-foreground  ">
        Banners cadastrados:
      </h2>

      {banners.length === 0 && (
        <p className="text-sm text-foreground">Nenhum banner cadastrado.</p>
      )}

      <div className="space-y-4">
        {banners.map((banner) => (
          <BannerCard
            key={banner.id}
            banner={banner}
            deleteBanner={deleteBanner}
          />
        ))}
      </div>
    </section>
  );
}
