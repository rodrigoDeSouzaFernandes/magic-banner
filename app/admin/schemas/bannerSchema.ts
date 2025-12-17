import * as z from "zod";

export type BannerFormData = z.infer<typeof bannerSchema>;

export const bannerSchema = z.object({
  url: z.url("Este campo deve conter uma url").nonempty("Campo obrigatório"),
  image: z.url("Este campo deve conter uma url").nonempty("Campo obrigatório"),
  startTime: z.string(),
  endTime: z.string(),
});
