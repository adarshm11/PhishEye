"use client";

import { useState, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import FileUploader from "./FileUploader";
import ActionButtons from "./ActionButtons";
import ResultDisplay from "./ResultDisplay";
import Tesseract from "tesseract.js";

export default function PhishingAnalyzer() {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [emailSender, setEmailSender] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [phishingResult, setPhishingResult] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        const imageDataURL = e.target.result as string;
        setFileName(file.name);

        try {
          const result = await Tesseract.recognize(imageDataURL, "eng");
          const splitEmail = parseEmailContent(result.data.text);
          setEmailSender(splitEmail[0]);
          setInputEmail(splitEmail[1]);
        } catch (error) {
          console.log("Image parse failed: ", error);
          setEmailSender("");
          setInputEmail("");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const parseEmailContent = (email: string) => {
    // First, use Regex to replace "|" with "I" -> Tesseract parsing bug
    const correctI = /\|/g;
    var cleanedEmail = email.replace(correctI, "I");

    // Then, use Regex to remove all special characters (outside of punctuation)
    const allowedCharacters = /[^a-zA-Z0-9 .,!?;:'"()@\-]/g;
    cleanedEmail = cleanedEmail.replace(allowedCharacters, "");
    
    // Finally, separate the sender and the email
    const match = cleanedEmail.match(
      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})[\s\S]*?\b(?:Dear|Hi|Hello)\b\s+[A-Z][a-zA-Z]*,([\s\S]*)/
    );
    
    if (match) {
      const sender = match[1];                             // e.g., "notifications@smartrecruiters.com"
      const emailContent = `${cleanedEmail.match(/\b(?:Dear|Hi|Hello)\b\s+[A-Z][a-zA-Z]*,/g)?.[0] ?? ""}${match[2]}`.trim();
      console.log({ sender, emailContent });
    } else {
      console.log("Pattern not matched.");
    }
    return ["Sender", cleanedEmail];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      readFile(files[0]);
    }
  };

  const handleSubmitClick = async () => {
    if (!inputEmail) return;

    const formData = new FormData();
    formData.append("inputEmail", inputEmail);
    formData.append("emailSender", emailSender);

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
    setInputEmail("");
    setFileName("");
    setPhishingResult(null);
    setEmailSender("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {theme === "dark" ? (
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      ) : (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      )}

      <div className="w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <FileUploader
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            fileName={fileName}
            inputEmail={inputEmail}
            setInputEmail={setInputEmail}
            emailSender={emailSender}
            setEmailSender={setEmailSender}
            handleReset={handleReset}
          />

          <div className="w-full h-3/4 flex mt-4 justify-center items-center">
            {inputEmail && emailSender && (
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
