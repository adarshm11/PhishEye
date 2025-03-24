"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [userInput, setUserInput] = useState<String>("");

  const readFile = (file: File) => {
    // read the file, setUserInput to the string contents
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full"> { /* app container */ }
      <div className="h-12 w-full bg-neutral-700 mb-10"> { /* nav bar container */ }
        <nav className="mx-4 my-1">
          { /* logo */ }
          { /* about us page */ }
          { /* github link */ }
          { /* dark mode / light mode button */ }
          <button
            onClick={() => alert("You Clicked")}
            className="cursor-pointer rounded-md hover:bg-neutral-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12.808c-.5 5.347-5.849 9.14-11.107 7.983C-.078 18.6 1.15 3.909 11.11 3C6.395 9.296 14.619 17.462 21 12.808"/></svg>
          </button>
        </nav>
      </div>
      <div className="w-full"> { /* body container */ }
        <div className="flex flex-col justify-center items-center mb-10"> { /* title container */ }
          <h1 className="text-5xl mb-8">PhishShield</h1>
          <p>Protect yourself from phishing (change this later)</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center"> { /* main content container */ }
          <div className="w-3/8 h-64 flex flex-col justify-center items-center"> { /* user input container */ }
            {/* Change to accept files -> when receiving file, read it and insert text to onChange */}
            <input 
              type="text"
              className="w-full h-full bg-gray-500 rounded-xl"
              placeholder="Enter text here..."
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <div className="w-full h-3/4"> { /* buttons */ }
            { userInput && (
              <div>
                <button
                  className=""
                  onClick={() => alert("You clicked")}
                >
                  Analyze
                </button>
                <button
                  className=""
                  onClick={() => alert("You clicked")}
                >
                  Reset
                </button>
              </div>
            )}
          </div> 
          <div> { /* result container */ }
            <p>This is where the result of the analysis will be displayed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
