import { bannerSchema, type BannerFormData } from "../schemas/bannerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerApi } from "../services/banner.api";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { TimeInputName, UseBannerFormProps } from "../types";

export default function useBannerForm({ loadBanners }: UseBannerFormProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      url: "",
      image: "",
      startTime: "",
      endTime: "",
    },
  });

  const onSubmit = async (value: BannerFormData) => {
    setLoading(true);

    await bannerApi
      .create(value)
      .then(async (res) => {
        const data = await res.json();

        if (!data.ok) {
          throw new Error(data.error || "Erro desconhecido");
        }

        await loadBanners();

        toast.success("Banner criado com sucesso");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onInvalidTime = (
    e: FormEvent<HTMLInputElement>,
    fieldName: TimeInputName
  ) => {
    e.preventDefault();
    form.setError(fieldName, {
      type: "manual",
      message: "Informe um horário válido no formato HH:mm ou deixe em branco",
    });
  };

  return { form, onSubmit, onInvalidTime, loading };
}
