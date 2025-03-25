"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [phishingResult, setPhishingResult] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUserInput(e.target.result as string);
        setFileName(file.name);
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      readFile(files[0]);
    }
  };

  const handleSubmitClick = async () => {
    console.log("Reached here");
    if (!userInput) return;

    const formData = new FormData();
    formData.append("userInput", userInput);

    try {
      const response = await fetch("http://localhost:5001/upload-text", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPhishingResult(data["Phishing Probability"]);
      }
    } catch (error) {
      console.error("Upload to backend failed" + error);
    }
  };

  const handleReset = () => {
    setUserInput("");
    setFileName("");
    setPhishingResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      {/* app container */}
      <div className="h-12 w-full bg-neutral-700 mb-10">
        {/* nav bar container */}
        <nav className="mx-4 my-1">
          {/* logo */}
          {/* about us page */}
          {/* github link */}
          {/* dark mode / light mode button */}
          <button
            onClick={() => alert("You Clicked")}
            className="cursor-pointer rounded-md hover:bg-neutral-400"
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
        </nav>
      </div>
      <div className="w-full">
        {/* body container */}
        <div className="flex flex-col justify-center items-center mb-10">
          {/* title container */}
          <h1 className="text-5xl mb-8">PhishShield</h1>
          <p>Protect yourself from phishing (change this later)</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          {/* main content container */}
          <div className="w-3/8 h-64 flex flex-col justify-center items-center">
            {/* user input container */}
            <input
              type="file"
              accept=".txt,.text"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <button
              className="mb-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              Select File
            </button>

            {/* Display filename when available */}
            {fileName && (
              <div className="mb-2 text-green-400">File loaded: {fileName}</div>
            )}

            <textarea
              type="text"
              className="w-full h-full bg-gray-500 rounded-xl px-4 py-2"
              placeholder="Or enter email text content here..."
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
          </div>
          <div className="w-full h-3/4 flex mt-4 justify-center items-center">
            {/* buttons */}
            {userInput && (
              <div className="flex space-x-4">
                <button
                  className="cursor-pointer rounded-md px-4 py-2 bg-purple-600 hover:bg-purple-700"
                  onClick={() => handleSubmitClick()}
                >
                  Analyze
                </button>
                <button
                  className="cursor-pointer rounded-md px-4 py-2 bg-purple-600 hover:bg-purple-700"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
          {/* Result container */}
          <div>
            {phishingResult != null && (
              <p className="text-white text-xl mt-4">
                Result:{" "}
                <span className="font-bold text-yellow-300">
                  {phishingResult}%
                </span>{" "}
                likely to be phishing
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
