interface ActionButtonsProps {
  onAnalyze: () => void;
  onReset: () => void;
}

export default function ActionButtons({
  onAnalyze,
  onReset,
}: ActionButtonsProps) {
  return (
    <div className="flex space-x-4">
      <button
        className="cursor-pointer rounded-md px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white"
        onClick={onAnalyze}
      >
        Analyze
      </button>
      <button
        className="cursor-pointer rounded-md px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}
