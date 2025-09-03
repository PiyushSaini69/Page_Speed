import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import CirculerProgress from "./CirculerProgress";

export default function Test() {
  const [value, setValue] = useState(2.5);
  const [progress, setProgress] = useState(90);
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Progress Bar with Knob</h2>
      <ProgressBar value={value}  />
      
      <CirculerProgress value={progress} />
    </div>
  );
}