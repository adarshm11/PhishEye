import { useTheme } from "@/app/components/ThemeProvider";

export default function Header() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1
        className={`text-5xl mb-8 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        PhishShield
      </h1>
      <p
        className={`ml-2 sm:ml-4 md:ml-6 ${
          theme === "dark" ? "text-neutral-300" : "text-neutral-700"
        }`}
      >
        Protect yourself from phishing
      </p>
    </div>
  );
}
