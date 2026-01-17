import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";
import StatusCard from "../components/StatusCard";
import AlertBanner from "../components/AlertBanner";
import ChartCard from "../components/ChartCard";
import SosButton from "../components/SosButton";

export default function Dashboard() {
  const { state } = useContext(SystemContext);

  return (
    <div className="container">
      <AlertBanner active={state.accident} />

      <div className="grid grid-3">
        <StatusCard title="Crowd Status" value={state.crowd ? "Crowded" : "Normal"} />
        <StatusCard title="Brightness Level" value={state.brightness} />
        <StatusCard title="Priority Level" value={state.priority} />
      </div>

      <div className="grid grid-3" style={{ marginTop: "1rem" }}>
        <ChartCard />
        <SosButton />
      </div>
    </div>
  );
}
