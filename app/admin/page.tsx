"use client";

import { useEffect, useState } from "react";
import BannerForm from "./components/BannerForm";
import BannerList from "./components/BannerList";

interface Banner {
  id: string;
  url: string;
  image: string;
  startTime?: string;
  endTime?: string;
}

export default function AdminPage() {
  const [banners, setBanners] = useState<Banner[]>([]);

  async function loadBanners() {
    const res = await fetch("/api/banners");
    const data = await res.json();
    setBanners(data);
  }

  useEffect(() => {
    loadBanners();
  }, []);

  async function deleteBanner(id: string) {
    await fetch(`/api/banners?id=${id}`, { method: "DELETE" });
    loadBanners();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Magic Banner · Admin</h1>
        </header>
        <BannerForm loadBanners={loadBanners} />
        <BannerList banners={banners} deleteBanner={deleteBanner} />
      </div>
    </main>
  );
}
