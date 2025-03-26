// This home page is a Server Component
import PhishingAnalyzer from "@/app/components/PhishingAnalyzer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Server-rendered navigation */}
      <div className="h-12 w-full bg-neutral-700 mb-10">
        <nav className="mx-4 my-1">
          <button className="cursor-pointer rounded-md hover:bg-neutral-500 mt-1.5">
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
          <button className="cursor-pointer rounded-md hover:bg-neutral-500 mt-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <g
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  clipPath="url(#mageSun0)"
                >
                  <path d="M12 17.885a5.885 5.885 0 1 0 0-11.77a5.885 5.885 0 0 0 0 11.77m-9.281-5.879H1.5m21 0h-1.207m-9.287-9.287V1.5m0 21v-1.207M5.435 5.435l-.859-.859m14.848 14.848l-.86-.86m.001-13.129l.858-.859M4.576 19.424l.86-.86" />
                </g>
                <defs>
                  <clipPath id="mageSun0">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                  </clipPath>
                </defs>
              </g>
            </svg>
          </button>
        </nav>
      </div>

      <div className="w-full">
        {/* Server-rendered header */}
        <div className="flex flex-col justify-center items-center mb-10">
          <h1 className="text-5xl mb-8">PhishShield</h1>
          <p className="ml-2 sm:ml-4 md:ml-6">
            Protect yourself from phishing (change this later)
          </p>
        </div>

        {/* Client-side interactive component */}
        <PhishingAnalyzer />
      </div>
    </div>
  );
}
