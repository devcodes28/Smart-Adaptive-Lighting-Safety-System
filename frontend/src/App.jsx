import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const API = "http://localhost:5000/api";

export default function App() {
  const [status, setStatus] = useState({});
  const [connected, setConnected] = useState(true);
  const [timeLabels, setTimeLabels] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [brightnessData, setBrightnessData] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API}/status`);
        const data = await res.json();

        setStatus(data);
        setConnected(true);

        const time = new Date().toLocaleTimeString();

        setTimeLabels((prev) => [...prev.slice(-9), time]);
        setPeopleData((prev) => [...prev.slice(-9), data.peopleCount || 0]);

        const brightness =
          data.occupancy === "NO"
            ? 0
            : data.crowd === "HIGH"
            ? 100
            : 60;

        setBrightnessData((prev) => [...prev.slice(-9), brightness]);
      } catch {
        setConnected(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const triggerSOS = async () => {
    await fetch(`${API}/sos`, { method: "POST" });
    alert("🚨 SOS Triggered");
  };

  return (
    <div style={styles.page}>
      <h1>Smart Adaptive Lighting & Safety</h1>
      <p style={{ opacity: 0.7 }}>
        System Status:{" "}
        <b style={{ color: connected ? "#22c55e" : "#ef4444" }}>
          {connected ? "CONNECTED" : "OFFLINE"}
        </b>
      </p>

      {/* STATUS CARDS */}
      <div style={styles.grid}>
        <Card title="Occupancy" value={status.occupancy} />
        <Card title="Crowd" value={status.crowd} />
        <Card title="Accident" value={status.accident} />
        <Card title="Brightness" value={status.brightness || "AUTO"} />
      </div>

      {/* CHARTS */}
      <h2>Live Sensor Visualizations</h2>

      <div style={styles.chartGrid}>
        <ChartCard title="People Count (Live)">
          <Line
            data={{
              labels: timeLabels,
              datasets: [
                {
                  label: "People",
                  data: peopleData,
                  borderColor: "#38bdf8",
                  tension: 0.4,
                },
              ],
            }}
          />
        </ChartCard>

        <ChartCard title="Brightness Level (%)">
          <Line
            data={{
              labels: timeLabels,
              datasets: [
                {
                  label: "Brightness",
                  data: brightnessData,
                  borderColor: "#facc15",
                  tension: 0.4,
                },
              ],
            }}
          />
        </ChartCard>

        <ChartCard title="Crowd State">
          <Bar
            data={{
              labels: ["LOW", "NORMAL", "HIGH"],
              datasets: [
                {
                  label: "Crowd",
                  data: [
                    status.crowd === "LOW" ? 1 : 0,
                    status.crowd === "NORMAL" ? 1 : 0,
                    status.crowd === "HIGH" ? 1 : 0,
                  ],
                  backgroundColor: ["#22c55e", "#38bdf8", "#ef4444"],
                },
              ],
            }}
          />
        </ChartCard>
      </div>

      <button style={styles.sos} onClick={triggerSOS}>
        🚨 EMERGENCY SOS
      </button>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <p>{title}</p>
      <h2>{value || "--"}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div style={styles.chartCard}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    padding: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginBottom: "40px",
  },
  card: {
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "20px",
  },
  chartCard: {
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "20px",
    background: "#020617",
  },
  sos: {
    background: "#dc2626",
    color: "white",
    padding: "15px 30px",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};
