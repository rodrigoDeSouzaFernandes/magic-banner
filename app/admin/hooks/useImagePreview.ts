import { useEffect, useState } from "react";

export function useImagePreview(src?: string) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsValid(false);
      return;
    }

    const img = new Image();

    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);

    img.src = src;
  }, [src]);

  return isValid;
}
