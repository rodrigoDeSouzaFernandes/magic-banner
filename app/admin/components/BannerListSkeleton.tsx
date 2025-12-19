import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

type BannerListSkeletonProps = {
  items?: number;
};

export default function BannerListSkeleton({
  items = 3,
}: BannerListSkeletonProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Banners cadastrados</h2>

      <div className="space-y-4">
        {Array.from({ length: items }).map((_, index) => (
          <Card
            key={index}
            className="grid grid-cols-[1fr_auto] items-center gap-y-2 p-4 px-6"
          >
            <div className="space-y-2 overflow-hidden">
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-3 w-[40%]" />
            </div>

            <Skeleton className="h-8 w-20 rounded-md" />

            <div className="col-span-2">
              <Skeleton className="h-2 w-full rounded-lg" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
