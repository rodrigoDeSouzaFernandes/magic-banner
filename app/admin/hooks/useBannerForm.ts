import { bannerSchema, type BannerFormData } from "../schemas/bannerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useBannerForm() {
  const { register, handleSubmit } = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
  });

  const onSubmit = (value: BannerFormData) => {
    console.log(value);
  };

  return { register, handleSubmit, onSubmit };
}
