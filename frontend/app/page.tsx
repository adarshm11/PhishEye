"use client";
import PhishingAnalyzer from "@/app/components/PhishingAnalyzer";

import { useState } from "react";

export default function Home() {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="h-12 w-full bg-neutral-700 mb-10 relative">
        <nav className="mx-4 my-1 flex">
          <div className="relative">
            {isToggled ? (
              <button
                onClick={() => setIsToggled(false)}
                className="cursor-pointer rounded-md hover:bg-neutral-400 absolute mt-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 12.808c-.5 5.347-5.849 9.14-11.107 7.983C-.078 18.6 1.15 3.909 11.11 3C6.395 9.296 14.619 17.462 21 12.808"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setIsToggled(true)}
                className="cursor-pointer rounded-md hover:bg-neutral-400 absolute mt-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"
                  />
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </nav>
      </div>

      <div className="w-full">
        {/* Server-rendered header */}
        <div className="flex flex-col justify-center items-center mb-10">
          <h1 className="text-5xl mb-8">PhishShield</h1>
          <p className="ml-2 sm:ml-4 md:ml-6">
            Protect yourself from phishing
          </p>
        </div>
        {/* Client-side interactive component */}
        <PhishingAnalyzer />
      </div>
    </div>
  );
}
