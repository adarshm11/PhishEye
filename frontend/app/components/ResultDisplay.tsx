interface ResultDisplayProps {
  phishingResult: number;
  theme: "light" | "dark";
}

export default function ResultDisplay({
  phishingResult,
  theme,
}: ResultDisplayProps) {
  return (
    <div
      className={`mt-6 p-4 rounded-xl ${
        theme === "dark"
          ? "bg-gray-800 bg-opacity-70"
          : "bg-white bg-opacity-80 border border-gray-300"
      }`}
    >
      <div className="text-center">
        <p
          className="text-xl"
          style={{ color: theme === "dark" ? "white" : "black" }}
        >
          Result:{" "}
          <span
            className={`font-bold ${
              phishingResult < 30
                ? "text-green-400"
                : phishingResult < 70
                ? "text-yellow-300"
                : "text-red-500"
            }`}
          >
            {phishingResult}%
          </span>{" "}
          likely to be phishing
        </p>

        <p
          className={`mt-2 text-sm ${
            phishingResult < 30
              ? "text-green-400"
              : phishingResult < 70
              ? "text-yellow-300"
              : "text-red-500"
          }`}
        >
          {phishingResult < 30
            ? "This content appears to be legitimate."
            : phishingResult < 70
            ? "This content shows some suspicious characteristics."
            : "This content is likely a phishing attempt!"}
        </p>

        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <div
            className={`h-2 rounded-full ${
              phishingResult < 30
                ? "bg-green-400"
                : phishingResult < 70
                ? "bg-yellow-300"
                : "bg-red-500"
            }`}
            style={{ width: `${phishingResult}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
