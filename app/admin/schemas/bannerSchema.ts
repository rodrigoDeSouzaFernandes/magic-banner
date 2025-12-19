import * as z from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export type BannerFormData = z.infer<typeof bannerSchema>;

export const bannerSchema = z
  .object({
    url: z.url({
      message: "Informe uma URL válida (ex: https://site.com/produto)",
    }),

    image: z.url({
      message: "Informe uma URL válida de imagem",
    }),

    startTime: z.string()
      .optional()
      .refine((val) => !val || timeRegex.test(val), {
        message: "Horário deve estar no formato HH:MM (ex: 09:30)",
      }),

    endTime: z.string()
      .optional()
      .refine((val) => !val || timeRegex.test(val), {
        message: "Horário deve estar no formato HH:MM (ex: 18:00)",
      }),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      return timeToMinutes(data.startTime) < timeToMinutes(data.endTime);
    },
    {
      message: "O horário final deve ser maior que o horário inicial",
      path: ["endTime"],
    }
  );
