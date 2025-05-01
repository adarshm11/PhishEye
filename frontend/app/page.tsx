"use client";

import PhishingAnalyzer from "@/app/components/PhishingAnalyzer";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div
        className={`h-12 w-full mb-10 relative flex items-center ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <div className="ml-4 mt-4">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full">
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
        <PhishingAnalyzer />
      </div>
    </div>
  );
}
