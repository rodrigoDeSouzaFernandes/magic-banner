import React, { useState } from "react";
import { BannerPreview } from "./BannerPreview";

type BannerFormProps = {
  loadBanners: () => void;
};

export default function BannerForm({ loadBanners }: BannerFormProps) {
  const [form, setForm] = useState({
    url: "",
    image: "",
    startTime: "",
    endTime: "",
  });

  async function createBanner(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: form.url,
        image: form.image,
        startTime: form.startTime || undefined,
        endTime: form.endTime || undefined,
      }),
    });

    setForm({ url: "", image: "", startTime: "", endTime: "" });
    loadBanners();
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-medium">Criar novo banner</h2>

      <form
        onSubmit={createBanner}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">URL da página</label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            placeholder="https://loja.com/produto/123"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">
            Imagem do banner (URL)
          </label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            placeholder="https://cdn.com/banner.png"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hora início</label>
          <input
            type="time"
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hora fim</label>
          <input
            type="time"
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Salvar banner
          </button>
        </div>
      </form>

      {/* PREVIEW */}
      {form.image && (
        <div className="mt-6 rounded-xl border bg-gray-50 p-4">
          <p className="mb-2 text-sm font-medium text-gray-600">Preview</p>
          <BannerPreview image={form.image} />
        </div>
      )}
    </section>
  );
}
