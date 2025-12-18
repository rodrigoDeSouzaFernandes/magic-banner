import { bannerSchema, type BannerFormData } from "../schemas/bannerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerApi } from "../services/banner.api";
import { FormEvent, InvalidEvent } from "react";

type TimeInputName = "startTime" | "endTime";

export default function useBannerForm() {
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
    await bannerApi.create(value).then(() => {
      //loading false
      //exibe snackbar
      form.reset();
    });
  };

  const onInvalidTime = (e: FormEvent<HTMLInputElement>, fieldName: TimeInputName) => {
    e.preventDefault();
    form.setError(fieldName, {
      type: "manual",
      message: "Informe um horário válido no formato HH:mm ou deixe em branco",
    });
  };

  return { form, onSubmit, onInvalidTime };
}
