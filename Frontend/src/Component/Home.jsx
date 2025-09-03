import React, { useState } from "react";
import Navbar from "./Navbar";
import Button from "./Button";

export default function Home() {
  const [url, setUrl] = useState("");
  const [desktopData, setDesktopData] = useState(null);
  const [mobileData, setMobileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [desktop, setDesktop] = useState(true);

  function scoreLCP(lcp) {
  if (lcp <= 2.5) return 1;
  if (lcp > 4) return 0;
  return (4 - lcp) / (4 - 2.5); // linear between 2.5–4s
  }
  
  function scoreCLS(cls) {
  if (cls <= 0.1) return 1;
  if (cls > 0.25) return 0;
  return (0.25 - cls) / (0.25 - 0.1);
  }

  function scoreINP(inp) {
  if (inp <= 200) return 1;
  if (inp > 500) return 0;
  return (500 - inp) / (500 - 200);
  }

  function scoreFCP(fcp) {
  if (fcp <= 1.8) return 1;
  if (fcp > 3) return 0;
  return (3 - fcp) / (3 - 1.8);
  }

  function scoreTTFB(ttfb) {
  if (ttfb <= 200) return 1;
  if (ttfb > 600) return 0;
  return (600 - ttfb) / (600 - 200); // linear between 200–600ms
  }


  const extractINP = (audits) => {
  // Try experimental first, fallback to stable, otherwise "N/A"
  return (
    audits?.["experimental-interaction-to-next-paint"]?.displayValue ||
    audits?.["interaction-to-next-paint"]?.displayValue ||
    "N/A"
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      const desktopdata = {
        url: result.desktop?.lighthouseResult?.finalUrl || url,
        totalTiming: result.desktop?.lighthouseResult?.timing?.total || "N/A",
        performance:
          (result.desktop?.lighthouseResult?.categories?.performance?.score ?? 0) *
            100 || "N/A",
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
          result.desktop?.lighthouseResult?.audits?.["total-blocking-time"]
            ?.displayValue || "N/A",
        inp: extractINP(result.desktop?.lighthouseResult?.audits),
        ttfb:
          result.desktop?.lighthouseResult?.audits?.["server-response-time"]
            ?.displayValue || "N/A",
      };

      const mobiledata = {
        url: result.mobile?.lighthouseResult?.finalUrl || url,
        totalTiming: result.mobile?.lighthouseResult?.timing?.total || "N/A",
        performance:
          (result.mobile?.lighthouseResult?.categories?.performance?.score ??
            0) * 100 || "N/A",
        fcp:
          result.mobile?.lighthouseResult?.audits?.[
            "first-contentful-paint"
          ]?.displayValue || "N/A",
        lcp:
          result.mobile?.lighthouseResult?.audits?.[
            "largest-contentful-paint"
          ]?.displayValue || "N/A",
        cls:
          result.mobile?.lighthouseResult?.audits?.[
            "cumulative-layout-shift"
          ]?.displayValue || "N/A",
        tbt:
          result.mobile?.lighthouseResult?.audits?.["total-blocking-time"]
            ?.displayValue || "N/A",
        inp: extractINP(result.mobile?.lighthouseResult?.audits),
        ttfb:
          result.mobile?.lighthouseResult?.audits?.["server-response-time"]
            ?.displayValue || "N/A",
      };

      setDesktopData(desktopdata);
      setMobileData(mobiledata);
      setUrl(""); // clear input
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const displayData = desktop ? desktopData : mobileData;

  return (
    <>
      <Navbar />

      <div className="min-h bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🚀 Website Performance Checker
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg flex  items-center"
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
            disabled={loading}
            className=" bg-amber-500 mb-4 ml-4 p-2 text-white font-semibold px-2 py-2 rounded-xl shadow-md hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Analyse
          </button>
        </form>
            {loading ? 
            <div>
              <div className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
                ⏳ Analyzing website... Please wait
              </div>
            </div>
          :
<div>

        {desktopData && mobileData && (
          <div className="flex justify-center items-center mt-10 space-x-4">
            <Button onClick={() => setDesktop(true)}>🖥️ Desktop</Button>
            <Button onClick={() => setDesktop(false)}>📱 Mobile</Button>
            </div>
          )}

        {/* Results Section */}
        {displayData && (
          <div className="mt-10 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">✅ Results</h2>

          <div className="grid gap-4">
              <h2>For {desktop ? "Desktop" : "Mobile"}:</h2>
              <div className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-xl transition">
                <div>
                  <p className="font-medium text-lg text-gray-800">
                    🌍 {displayData.url}
                  </p>
                  <p className="text-sm text-gray-500">
                    Timing: {displayData.totalTiming} ms
                  </p>
                </div>
                <span
                  className={`mt-3 md:mt-0 px-4 py-2 rounded-lg text-white font-bold ${
                    displayData.performance >= 80
                      ? "bg-green-500"
                      : displayData.performance >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                >
                  {displayData.performance}%
                </span>
              </div>

<div className="bg-white shadow-md rounded-xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="font-semibold text-gray-700">FCP</p>
                  <p className="text-gray-600">{displayData.fcp}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">LCP</p>
                  <p className="text-gray-600">{displayData.lcp}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">CLS</p>
                  <p className="text-gray-600">{displayData.cls}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">TBT</p>
                  <p className="text-gray-600">{displayData.tbt}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">INP</p>
                  <p className="text-gray-600">{displayData.inp}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">TTFB</p>
                  <p className="text-gray-600">{displayData.ttfb}</p>
                </div>
              </div>

</div>
</div>
        )}
        </div>
}
      </div>
    </>
  );
}
