import { ThemeToggle } from "@/components/ThemeToogle";

export const Header = () => {
  return (
    <header className="flex flex-col flex-row items-center justify-between gap-4 sm:gap-0 p-6 bg-card rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-foreground">
        Magic Banner
      </h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
};
