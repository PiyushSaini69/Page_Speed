export default function getTechnicalPerformanceScore(psiResult) {
  const audits = psiResult?.lighthouseResult?.audits || {};

  const scoreLinear = (value, min, max) => {
    if (value <= min) return 1;
    if (value >= max) return 0;
    return 1 - (value - min) / (max - min);
  };

  const lcp = Number((audits["largest-contentful-paint"]?.numericValue || 0) / 1000);
  const cls = Number(audits["cumulative-layout-shift"]?.numericValue || 0);
  const inp = Number(audits["experimental-interaction-to-next-paint"]?.numericValue || 0);
  const ttfb = Number((audits["server-response-time"]?.numericValue || 0) / 1000);
  const compression = Math.min(audits["uses-text-compression"]?.score || 0, 1);
  const caching = Math.min(audits["uses-long-cache-ttl"]?.score || 0, 1);
  const http2or3 = audits["uses-http2"]?.score === 1 || audits["uses-http3"]?.score === 1;
  const sitemapScoreRaw = audits["sitemap"]?.score || 0;
  const robotsScoreRaw = audits["robots-txt"]?.score === 1 ? 1 : 0;
  const brokenLinksPercent = Number(audits["no-broken-links"]?.details?.items?.[0]?.failureCount || 0);
  const redirectChainsPercent = Number(audits["redirects"]?.details?.items?.length || 0);

  // --- A1 ---
  const lcpScore = scoreLinear(lcp, 2.5, 4) * 5;
  const clsScore = scoreLinear(cls, 0.1, 0.25) * 3;
  const inpScore = scoreLinear(inp, 200, 500) * 4;
  const a1 = lcpScore + clsScore + inpScore;

  // --- A2 ---
  const ttfbScore = scoreLinear(ttfb, 0.8, 1.8) * 3;
  const compressionScore = compression * 2;
  const cachingScore = caching * 2;
  const httpScore = http2or3 ? 1 : 0;
  const a2 = ttfbScore + compressionScore + cachingScore + httpScore;

  // --- A3 ---
  const sitemapScore = sitemapScoreRaw * 2;
  const robotsScore = robotsScoreRaw * 2;

  let brokenLinksScore = 0;
  if (brokenLinksPercent === 0) brokenLinksScore = 2;
  else if (brokenLinksPercent <= 2) brokenLinksScore = 2 - (brokenLinksPercent / 2);
  else brokenLinksScore = 0;

  let redirectChainsScore = 0;
  if (redirectChainsPercent === 0) redirectChainsScore = 2;
  else if (redirectChainsPercent <= 5) redirectChainsScore = 2 - (redirectChainsPercent / 5 * 2);
  else redirectChainsScore = 0;

  const a3 = sitemapScore + robotsScore + brokenLinksScore + redirectChainsScore;

  const total = a1 + a2 + a3;

  return {
    lcpScore: lcpScore.toFixed(2),
    clsScore: clsScore.toFixed(2),
    inpScore: inpScore.toFixed(2),
    a1: a1.toFixed(2),
    ttfbScore: ttfbScore.toFixed(2),
    compressionScore: compressionScore.toFixed(2),
    cachingScore: cachingScore.toFixed(2),
    httpScore: httpScore.toFixed(2),
    a2: a2.toFixed(2),
    sitemapScore: sitemapScore.toFixed(2),
    robotsScore: robotsScore.toFixed(2),
    brokenLinksScore: brokenLinksScore.toFixed(2),
    redirectChainsScore: redirectChainsScore.toFixed(2),
    a3: a3.toFixed(2),
    total: total.toFixed(2),
  };
}
