import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BannerPreview } from "./BannerPreview";
import { BannerCardProps } from "../types";
import { Trash2 } from "lucide-react";
import { DeleteBannerDialog } from "./DeleteBannerDialog";
import { useState } from "react";
import { BannerId } from "@/lib/banner/banner.types";

export default function BannerCard({ banner, deleteBanner }: BannerCardProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const confirmDeletion = async (id: BannerId) => {
    setLoading(true);
    await deleteBanner(id);
    setLoading(false);
  };

  return (
    <Card
      key={banner.id}
      className="grid grid-cols-1 sm:grid-cols-[1fr_auto] justify-between sm:items-center p-4 px-6 gap-y-1 height-min"
    >
      <CardContent className="space-y-1 p-0 overflow-hidden ">
        <p className="text-sm font-medium line-clamp-1">{banner.url}</p>
        <p className="text-xs text-foreground/70">
          {banner.startTime && banner.endTime
            ? `Visível das ${banner.startTime} às ${banner.endTime}`
            : "Sempre visível"}
        </p>
      </CardContent>

      <CardFooter className="p-0 grid-row-3">
        <DeleteBannerDialog
          loading={loading}
          url={banner.url}
          onConfirm={() => confirmDeletion(banner.id)}
          trigger={
            <Button variant="destructive" size="sm" className="w-full mt-4">
              Excluir
              <Trash2 />
            </Button>
          }
        />
      </CardFooter>
      <div className="sm:col-span-2 row-2">
        <BannerPreview image={banner.image} label="Mostrar Banner" />
      </div>
    </Card>
  );
}
