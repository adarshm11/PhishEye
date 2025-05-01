import { useTheme } from "@/app/components/ThemeProvider";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function NavBar() {
  const { theme } = useTheme();

  return (
    <div
      className={`h-12 w-full mb-10 relative flex items-center ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="ml-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
