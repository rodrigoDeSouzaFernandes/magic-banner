import { Banner } from "@/lib/banner.types";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BannerPreview } from "./BannerPreview";

type BannerListProps = {
  banners: Banner[];
  deleteBanner: (id: string) => void;
};

export default function BannerList({ banners, deleteBanner }: BannerListProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Banners cadastrados</h2>

      {banners.length === 0 && (
        <p className="text-sm text-gray-500">Nenhum banner cadastrado.</p>
      )}

      <div className="space-y-4">
        {banners.map((banner) => (
          <Card
            key={banner.id}
            className="grid grid-cols-[1fr_auto] justify-between items-center p-4 px-6 gap-y-1 height-min"
          >
            <CardContent className="space-y-1 p-0 overflow-hidden">
              <p className="text-sm font-medium line-clamp-1">{banner.url}</p>
              <p className="text-xs text-gray-500">
                {banner.startTime && banner.endTime
                  ? `Visível das ${banner.startTime} às ${banner.endTime}`
                  : "Sempre visível"}
              </p>
            </CardContent>

            <CardFooter className="p-0">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteBanner(banner.id)}
              >
                Excluir
              </Button>
            </CardFooter>
            <div className="col-span-2">
              <BannerPreview image={banner.image} label="Mostrar Banner" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
