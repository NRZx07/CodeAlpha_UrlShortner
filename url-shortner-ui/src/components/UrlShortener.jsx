import React, { useState } from "react";
import Analytics from "./Analytics";

const backendBaseURL = "https://codealpha-urlshortner.onrender.com/";


function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [error, setError] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortId("");
    setShowAnalytics(false);

    let url = originalUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    try {
      const response = await fetch(`${backendBaseURL}url`, 
         {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortId(data.id);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Failed to connect to server");
    }
  };

  return (
    <div style={styles.backgroundWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🔗 URL Shortener</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter a valid URL, e.g. https://example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            🚀 Shorten URL
          </button>
        </form>

        {shortId && (
          <div style={styles.resultBox}>
            <p style={{ marginBottom: 8 }}>
              ✅ Short URL:{" "}
              <a
                href={`${backendBaseURL}${shortId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {backendBaseURL + shortId}
              </a>
            </p>
            <button
              style={styles.analyticsBtn}
              onClick={() => setShowAnalytics(true)}
            >
              📊 View Analytics
            </button>
          </div>
        )}

        {showAnalytics && (
          <Analytics id={shortId} onClose={() => setShowAnalytics(false)} />
        )}

        {error && <p style={styles.error}>⚠️ {error}</p>}
      </div>
    </div>
  );
}

const styles = {
  backgroundWrapper: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1920&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "4rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 500,
    padding: "2rem",
    borderRadius: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Inter', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 24,
    color: "#1f2937",
    fontSize: 28,
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "0.75rem",
    border: "1px solid #d1d5db",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "14px 0",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 500,
    border: "none",
    borderRadius: "0.75rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  resultBox: {
    marginTop: 24,
    backgroundColor: "#e0f2fe",
    padding: 16,
    borderRadius: "0.75rem",
    textAlign: "center",
    border: "1px solid #bae6fd",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
  analyticsBtn: {
    marginTop: 12,
    padding: "10px 20px",
    fontSize: "15px",
    borderRadius: "0.75rem",
    border: "none",
    backgroundColor: "#22c55e",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "#ef4444",
    backgroundColor: "#fef2f2",
    padding: "10px 16px",
    marginTop: 16,
    borderRadius: "0.75rem",
    textAlign: "center",
    border: "1px solid #fca5a5",
  },
};

export default UrlShortener;
