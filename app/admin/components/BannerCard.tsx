import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BannerPreview } from "./BannerPreview";
import { Banner } from "@/lib/banner.types";
import { BannerCardProps } from "../types";
import { Trash2 } from "lucide-react";

export default function BannerCard({ banner, deleteBanner }: BannerCardProps) {
  return (
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
          <Trash2 />
        </Button>
      </CardFooter>
      <div className="col-span-2">
        <BannerPreview image={banner.image} label="Mostrar Banner" />
      </div>
    </Card>
  );
}
