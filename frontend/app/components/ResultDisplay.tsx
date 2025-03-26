interface ResultDisplayProps {
  phishingResult: number;
}

export default function ResultDisplay({ phishingResult }: ResultDisplayProps) {
  return (
    <div className="mt-6 p-4 bg-gray-800 bg-opacity-70 rounded-xl">
      <div className="text-center">
        <p className="text-white text-xl">
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
