import React, { useState } from "react";
import { BannerPreview } from "./BannerPreview";
import useBannerForm from "../hooks/useBannerForm";

type BannerFormProps = {
  loadBanners: () => void;
};

export default function BannerForm({ loadBanners }: BannerFormProps) {
  const { handleSubmit, onSubmit, register } = useBannerForm();

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-medium">Criar novo banner</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">URL da página</label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            placeholder="https://loja.com/produto/123"
            {...register("url")}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">
            Imagem do banner (URL)
          </label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            placeholder="https://cdn.com/banner.png"
            {...register("image")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hora início</label>
          <input
            type="time"
            className="mt-1 w-full rounded-md border px-3 py-2"
            {...register("startTime")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hora fim</label>
          <input
            type="time"
            className="mt-1 w-full rounded-md border px-3 py-2"
            {...register("endTime")}
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

      {/* PREVIEW
      {form.image && (
        <div className="mt-6 rounded-xl border bg-gray-50 p-4">
          <p className="mb-2 text-sm font-medium text-gray-600">Preview</p>
          <BannerPreview image={form.image} />
        </div>
      )} */}
    </section>
  );
}
