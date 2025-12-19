"use client";

import { ThemeToggle } from "@/components/ThemeToogle";
import BannerForm from "./components/BannerForm";
import BannerList from "./components/BannerList";

import BannerListSkeleton from "./components/BannerListSkeleton";
import { useAdminPage } from "./hooks/useAdminPage";

export default function AdminPage() {
  const { bannerListLoading, banners, deleteBanner, createBanner } =
    useAdminPage();

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8 text-gray-900">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Magic Banner · Admin</h1>
        </header>
        <ThemeToggle />
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
