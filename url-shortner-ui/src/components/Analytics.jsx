import React, { useEffect, useState } from "react";

const backendBaseURL = "http://localhost:8001";

function Analytics({ id, onClose }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch(`${backendBaseURL}/url/analytics/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError("Error loading analytics");
        console.error(err);
      }
    }
    fetchAnalytics();
  }, [id]);

  if (error) return <div style={{ color: "red", marginTop: 12 }}>{error}</div>;

  if (!analyticsData) return <div style={{ marginTop: 12 }}>Loading analytics...</div>;

  return (
    <div style={styles.container}>
      <h3>Analytics for ID: {id}</h3>
      <p>Total Clicks: {analyticsData.totalClicks}</p>
      <ul>
        {analyticsData.analytics.map((entry) => (
          <li key={entry._id}>
            Clicked at: {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <button onClick={onClose} style={styles.closeBtn}>
        Close
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f0f4f8",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    maxWidth: 400,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  closeBtn: {
    marginTop: 10,
    padding: "8px 12px",
    borderRadius: 5,
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
};

export default Analytics;
