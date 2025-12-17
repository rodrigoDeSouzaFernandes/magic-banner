import React, { useState } from "react";
import { BannerPreview } from "./BannerPreview";
import useBannerForm from "../hooks/useBannerForm";
import TextField from "@/shared/components/TextField";
import { useImagePreview } from "../hooks/useImagePreview";

type BannerFormProps = {
  loadBanners: () => void;
};

export default function BannerForm({ loadBanners }: BannerFormProps) {
  const { handleSubmit, onSubmit, register, errors, watch } = useBannerForm();

  const banner = watch("image");

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-medium">Criar novo banner</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <TextField
            label="URL da página"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            placeholder="https://loja.com/produto/123"
            {...register("url")}
            error={errors.url?.message}
          />
        </div>

        <div className="md:col-span-2">
          <TextField
            label="Imagem do banner (URL)"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            placeholder="https://cdn.com/banner.png"
            {...register("image")}
            error={errors.image?.message}
          />
        </div>

        <div>
          <TextField
            label="Hora início"
            type="time"
            className="mt-1 w-full rounded-md border px-3 py-2"
            {...register("startTime")}
            error={errors.startTime?.message}
          />
        </div>

        <div>
          <TextField
            label="Hora fim"
            type="time"
            className="mt-1 w-full rounded-md border px-3 py-2"
            {...register("endTime")}
            error={errors.endTime?.message}
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

      {banner && <BannerPreview image={banner} />}
    </section>
  );
}
