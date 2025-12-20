import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash } from "lucide-react";

import { ReactNode } from "react";

type DeleteBannerDialogProps = {
  trigger: ReactNode;
  url: string;
  onConfirm: () => void;
  loading: boolean;
};

export function DeleteBannerDialog({
  trigger,
  url,
  loading,
  onConfirm,
}: DeleteBannerDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="min-[368px]:text-left">
            Excluir banner?
          </AlertDialogTitle>

          <AlertDialogDescription className="w-full min-[368px]:text-left">
            Você está prestes a excluir o banner da URL:
            <span className="mt-2 block rounded bg-muted px-2 py-1 text-xs font-mono break-all text-left">
              {url}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col gap-2 min-[368px]:flex-row min-[368px]:ml-auto">
          <AlertDialogCancel className="" disabled={loading}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90 text-white"
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? (
              <>
                Excluindo... <Loader2 className="animate-spin" />{" "}
              </>
            ) : (
              "Excluir"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
