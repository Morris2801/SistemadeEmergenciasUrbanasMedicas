import { useState, useCallback } from "react";

export const useImageInputPreview = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handlePreview = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  return { previewUrls, handlePreview };
};
