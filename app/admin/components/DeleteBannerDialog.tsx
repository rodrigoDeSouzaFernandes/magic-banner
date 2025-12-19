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
          <AlertDialogTitle>Excluir banner?</AlertDialogTitle>

          <AlertDialogDescription>
            Você está prestes a excluir o banner da URL:
            <span className="mt-2 block truncate rounded bg-muted px-2 py-1 text-xs font-mono">
              {url}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
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
