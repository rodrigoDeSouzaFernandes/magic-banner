import { useState } from "react";
import {
  BrokenImage,
  HideImage,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useImagePreview } from "../hooks/useImagePreview";

export function BannerPreview({ image }: { image: string }) {
  const [visible, setVisible] = useState(true);
  const isImageValid = useImagePreview(image);

  return (
    <div className="mt-6 rounded-xl border bg-gray-50 p-4">
      <div className="flex items-center">
        <p className="text-sm font-medium text-gray-600">
          {visible ? "Banner" : "Pré-visualizar banner"}
        </p>

        <button
          onClick={() => setVisible((v) => !v)}
          className="ml-auto cursor-pointer rounded-sm bg-black/60 px-2 py-1 text-xs text-white hover:bg-black/80"
          aria-label="Alternar preview"
        >
          {visible ? (
            <HideImage fontSize="small" />
          ) : (
            <ImageIcon fontSize="small" />
          )}
        </button>
      </div>

      {visible && (
        <div className="mt-2 rounded-lg border bg-white shadow overflow-hidden">
          {isImageValid ? (
            <img src={image} alt="" className="w-full rounded" />
          ) : (
            <div className="flex gap-2 h-32 items-center justify-center text-sm">
              <BrokenImage className="text-slate-600" />
              <p className="text-slate-600">Imagem inválida ou indisponível</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
