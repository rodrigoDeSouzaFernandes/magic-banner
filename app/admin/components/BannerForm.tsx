import { BannerPreview } from "./BannerPreview";
import useBannerForm from "../hooks/useBannerForm";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LoaderCircle } from "lucide-react";

type BannerFormProps = {
  loadBanners: () => void;
};

export default function BannerForm({ loadBanners }: BannerFormProps) {
  const { form, onSubmit, onInvalidTime, loading } = useBannerForm({
    loadBanners,
  });

  const banner = form.watch("image");

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da página</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://loja.com/produto/123"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem do banner</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {banner ? <BannerPreview image={banner} /> : null}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="items-start h-min">
                  <FormLabel>Início</FormLabel>
                  <FormControl>
                    <Input
                      onInvalid={(e) => onInvalidTime(e, "startTime")}
                      type="time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="items-start h-min">
                  <FormLabel>Fim</FormLabel>
                  <FormControl>
                    <Input
                      onInvalid={(e) => onInvalidTime(e, "endTime")}
                      type="time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={loading}
            aria-disabled={loading}
            type="submit"
            className="ml-auto min-w-28"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Salvando...{" "}
              </>
            ) : (
              "Salvar Banner"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
