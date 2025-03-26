"use client";

import { useState, useRef } from "react";
import FileUploader from "./FileUploader";
import ActionButtons from "./ActionButtons";
import ResultDisplay from "./ResultDisplay";

export default function PhishingAnalyzer() {
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
        setPhishingResult(data["Phishing Probability"]);
      }
    } catch (error) {
      console.error("Upload to backend failed", error);
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

      <div className="w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <FileUploader
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            fileName={fileName}
            userInput={userInput}
            setUserInput={setUserInput}
          />

          <div className="w-full h-3/4 flex mt-4 justify-center items-center">
            {userInput && (
              <ActionButtons
                onAnalyze={handleSubmitClick}
                onReset={handleReset}
              />
            )}
          </div>

          {phishingResult !== null && (
            <ResultDisplay phishingResult={phishingResult} />
          )}
        </div>
      </div>
    </div>
  );
}
