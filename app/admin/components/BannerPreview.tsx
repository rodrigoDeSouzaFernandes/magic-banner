import { useState } from "react";

export function BannerPreview({ image }: { image: string }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative overflow-hidden rounded-lg border bg-white shadow">
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white"
      >
        ✕
      </button>
      <img src={image} alt="Banner preview" className="w-full" />
    </div>
  );
}