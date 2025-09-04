import React, { useState } from "react";

export default function SeoChecker({seourl}) {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleCheck = async () => {
    setLoading(true);
    try {
      const urle={seourl}
      setUrls(urle)
      const response = await fetch("http://localhost:2000/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urls: urls,
          page: 1,
          limit: 5,
        }),
      });
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ fontSize: "22px", marginBottom: "10px" }}>SEO Checker</h1>
      
      <button
        onClick={handleCheck}
        disabled={loading}
        style={{
          padding: "8px 16px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Checking..." : "Run SEO Check"}
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {results.map((r, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <h2 style={{ fontSize: "18px", marginBottom: "5px" }}>{r.url}</h2>
              {r.error ? (
                <p style={{ color: "red" }}>{r.error}</p>
              ) : (
                <>
                  <p>
                    <strong>Overall Score:</strong>{" "}
                    {(r.score * 100).toFixed(0)}%
                  </p>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "10px",
                    }}
                  >
                    <thead>
                      <tr style={{ background: "#f3f4f6" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                          Metric
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                          Score
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(r.categories).flatMap((c) =>
                        c.checks.map((chk, i) => (
                          <tr key={i}>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {chk.metric}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {(chk.score * 100).toFixed(0)}%
                            </td>
                          
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
