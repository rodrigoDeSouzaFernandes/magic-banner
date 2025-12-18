import * as z from "zod";

export type BannerFormData = z.infer<typeof bannerSchema>;

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const bannerSchema = z
  .object({
    url: z.url({
      message: "Informe uma URL válida (ex: https://site.com/produto)",
    }),

    image: z.url({
      message: "Informe uma URL válida de imagem",
    }),

    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => !data.startTime || !data.endTime || data.startTime < data.endTime,
    {
      message: "O horário inicial deve ser menor que o horário final",
      path: ["endTime"],
    }
  );
