import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";
import StatusCard from "../components/StatusCard";
import SosButton from "../components/SosButton";
const emergency = systemState.emergency;
{systemState.emergency && (
  <div className="emergency-banner">
    🚨 EMERGENCY MODE ACTIVE — SAFETY OVERRIDE
  </div>
)}

export default function Dashboard() {
  const { systemState } = useContext(SystemContext);

  return (
    <div className="container">
      <div className="header">
        <h1>Smart Adaptive Lighting & Safety</h1>
        <p>Live Monitoring Dashboard</p>
      </div>

      <div className="grid">
        <StatusCard title="Occupancy" value={systemState.occupancy ? "YES" : "NO"} />
        <StatusCard title="Crowd" value={systemState.crowd ? "DETECTED" : "NORMAL"} />
        <StatusCard title="Accident" value={systemState.accident ? "YES" : "NO"} />
        <StatusCard title="Brightness" value={systemState.brightness} />
      </div>

      <div className={`container ${emergency ? "emergency" : ""}`}>

        <SosButton />
      </div>
      
    </div>
  );
}
