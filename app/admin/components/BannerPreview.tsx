import { useState } from "react";
import { useImagePreview } from "../hooks/useImagePreview";
import { BannerPreviewProps } from "../types";

export function BannerPreview({
  image,
  label = "Pré-vizualizar Banner",
}: BannerPreviewProps) {
  const [visible, setVisible] = useState(false);
  const isImageValid = useImagePreview(image);

  if (!isImageValid) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="text-gray-600 hover:underline text-sm font-medium cursor-pointer"
        aria-expanded={visible}
        aria-controls="banner-preview"
      >
        {visible ? "Ocultar banner" : label}
      </button>

      {visible && (
        <div className="mt-2">
          <div className="overflow-hidden rounded-lg border bg-white shadow">
            <img src={image} alt="Banner preview" className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
