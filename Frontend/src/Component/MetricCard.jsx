import ProgressBar from "./ProgressBar";

export default function MetricCard({ label, value, unit, max, segments }) {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-lg shadow-sm bg-white w-full">
      {/* Label */}
      <span className="text-sm font-medium text-gray-700">{label}</span>

      {/* Value + Progress */}
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold text-gray-800">
          {value} <span className="text-sm text-gray-500">{unit}</span>
        </div>
        
        <ProgressBar value={value} max={max} />
      </div>
    </div>
  );
}