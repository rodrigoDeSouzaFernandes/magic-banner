"use client";

import { ThemeToggle } from "@/components/ThemeToogle";
import BannerForm from "./components/BannerForm";
import BannerList from "./components/BannerList";

import BannerListSkeleton from "./components/BannerListSkeleton";
import { useAdminPage } from "./hooks/useAdminPage";
import { Header } from "./components/Header";

export default function AdminPage() {
  const { bannerListLoading, banners, deleteBanner, createBanner } =
    useAdminPage();

  return (
    <main className="min-h-screen bg-background  p-4 sm:p-8 text-gray-900">
      <div className="mx-auto max-w-4xl space-y-8 text-foreground">
        <Header />
        <BannerForm onSubmitForm={createBanner} />
        {bannerListLoading ? (
          <BannerListSkeleton />
        ) : (
          <BannerList banners={banners} deleteBanner={deleteBanner} />
        )}
      </div>
    </main>
  );
}
