import { RefObject, Dispatch, SetStateAction } from "react";

interface FileUploaderProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
  inputEmail: string;
  setInputEmail: Dispatch<SetStateAction<string>>;
  emailSender: string;
  setEmailSender: Dispatch<SetStateAction<string>>;
  handleReset: () => void;
}

export default function FileUploader({
  fileInputRef,
  handleFileChange,
  fileName,
  inputEmail,
  setInputEmail,
  emailSender,
  setEmailSender,
  handleReset
}: FileUploaderProps) {

  const handleUserInputChange = (text: string, section: number) => {
    if (section === 1) { // the email sender changed
      if (!text && !inputEmail) {
        handleReset();
      } else {
        setEmailSender(text);
      }
    } else if (section === 2) { // the email content changed
      if (!text && !emailSender) {
        handleReset();
      } else {
        setInputEmail(text);
      }
    }
  }
  return (
    <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] h-auto flex flex-col justify-center items-center">
      { /* later -> check for .heic and convert */ }
      <input
        type="file"
        accept=".png, .jpeg, .jpg" 
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

      {fileName && (
        <div className="mb-2 text-green-400">File loaded: {fileName}</div>
      )}

      <textarea
        className="w-full sm:w-3/4 md:w-1/2 lg:w-2/3 lg:h-24 h-16 sm:h-20 md:h-24 bg-gray-500 rounded-xl px-4 py-2 mb-10"
        placeholder="Sender..."
        onChange={(e) => handleUserInputChange(e.target.value, 1)}
        value={emailSender}
      />

      <textarea
        className="w-full sm:w-3/4 md:w-1/2 lg:w-2/3 lg:h-64 h-40 sm:h-48 md:h-56 bg-gray-500 rounded-xl px-4 py-2"
        placeholder="Email text content..."
        onChange={(e) => handleUserInputChange(e.target.value, 2)}
        value={inputEmail}
      />
    </div>
  );
}
