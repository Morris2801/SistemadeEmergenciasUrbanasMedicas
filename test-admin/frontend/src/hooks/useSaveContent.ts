// src/hooks/useSaveContent.ts
import { useEffect } from "react";
import { useWatch, useFormContext } from "react-hook-form";

export const useSaveContent = (key: string) => {
  const { reset } = useFormContext();       
  const values = useWatch();                

  
  useEffect(() => {
    if (values) {
      localStorage.setItem(key, JSON.stringify(values));
    }
  }, [values, key]);

  
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        reset(parsed);
      } catch (e) {
        console.error("Error al cargar borrador guardado:", e);
      }
    }
  }, [key, reset]);
};
