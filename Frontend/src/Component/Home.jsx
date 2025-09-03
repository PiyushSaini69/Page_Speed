import React, { useState } from "react";
import Navbar from "./Navbar";
import ButtonShowcase from "./Button";
import Button from "./Button";

export default function Home() {
  const [url, setUrl] = useState("");
  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Desktop, setDesktop] = useState(True);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAllData(null);

    try {
      const response = await fetch("http://localhost:2000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: url }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      const newData = {
        url: result.desktop?.lighthouseResult?.finalUrl || url,
        totalTiming: result.desktop?.lighthouseResult?.timing?.total || "N/A",
        performance:
          (result.desktop?.lighthouseResult?.categories?.performance?.score ??
            0) * 100 || "N/A",
        fcp:
          result.desktop?.lighthouseResult?.audits?.[
            "first-contentful-paint"
          ]?.displayValue || "N/A",
        lcp:
          result.desktop?.lighthouseResult?.audits?.[
            "largest-contentful-paint"
          ]?.displayValue || "N/A",
        cls:
          result.desktop?.lighthouseResult?.audits?.[
            "cumulative-layout-shift"
          ]?.displayValue || "N/A",
        tbt:
          result.desktop?.lighthouseResult?.audits?.[
            "total-blocking-time"
          ]?.displayValue || "N/A",

        totalTimingMobile:
          result.mobile?.lighthouseResult?.timing?.total || "N/A",
        performanceMobile:
          (result.mobile?.lighthouseResult?.categories?.performance?.score ??
            0) * 100 || "N/A",
        fcpMobile:
          result.mobile?.lighthouseResult?.audits?.[
            "first-contentful-paint"
          ]?.displayValue || "N/A",
        lcpMobile:
          result.mobile?.lighthouseResult?.audits?.[
            "largest-contentful-paint"
          ]?.displayValue || "N/A",
        clsMobile:
          result.mobile?.lighthouseResult?.audits?.[
            "cumulative-layout-shift"
          ]?.displayValue || "N/A",
        tbtMobile:
          result.mobile?.lighthouseResult?.audits?.[
            "total-blocking-time"
          ]?.displayValue || "N/A",
      };

      setAllData(newData);
      setUrl(""); 
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
     
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🚀 Website Performance Checker
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg flex flex-col items-center"
        >
          <input
            type="url"
            placeholder="Enter your website URL..."
            value={url}
            className="border-2 border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 rounded-xl px-4 py-2 w-full mb-4 outline-none"
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-amber-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-amber-600 transition"
          >
            Check Performance
          </button>
        </form>


        {loading && (
          <div className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
            ⏳ Analyzing website... Please wait
          </div>
        )}

        {   (<div className="flex justify-center items-center mt-10">
  <div className="p-6 rounded-lg">
  <Button>🖥️ Desktop</Button>
<Button>📱 Mobile</Button>
  </div>
</div> )}

        {/* Results Section */}
        
      </div>
      <div>
      
      </div>
    </>
  );
}
