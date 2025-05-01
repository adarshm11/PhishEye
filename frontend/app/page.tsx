"use client";

import PhishingAnalyzer from "@/app/components/PhishingAnalyzer";
import NavBar from "@/app/components/NavBar";
import Header from "@/app/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <NavBar />
      <div className="w-full">
        <Header />
        <PhishingAnalyzer />
      </div>
    </div>
  );
}
