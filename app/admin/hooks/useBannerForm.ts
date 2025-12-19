import { bannerSchema, type BannerFormData } from "../schemas/bannerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertFormDataToRequest } from "../services/banner.api";
import { FormEvent, useState } from "react";
import { TimeInputName, UseBannerFormProps } from "../types";

export default function useBannerForm({
  onSubmitForm,
}: UseBannerFormProps) {
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

    const requestData = convertFormDataToRequest(value);

    await onSubmitForm(requestData)
      .then(async () => {
        form.reset();
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
