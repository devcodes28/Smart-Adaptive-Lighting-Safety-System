import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const { systemState } = useContext(SystemContext);

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <main className={`flex-1 ml-64 p-8 transition-all duration-500 ${systemState.emergency ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.2)]' : ''}`}>
        
        {/* Safety Override HUD */}
        {systemState.emergency && (
          <div className="mb-8 p-4 rounded-xl bg-neon-red/20 border border-neon-red text-neon-red text-center font-bold animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            🚨 EMERGENCY OVERRIDE ACTIVE — SAFETY PROTOCOLS ENGAGED
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card">
            <h3 className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Occupancy</h3>
            <p className="text-3xl font-black">{systemState.occupancy === "YES" ? "ACTIVE" : "CLEAR"}</p>
          </div>
          <div className={`glass-card ${systemState.accident === "YES" ? 'border-neon-red' : ''}`}>
            <h3 className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Safety Status</h3>
            <p className={`text-3xl font-black ${systemState.accident === "YES" ? 'text-neon-red' : 'text-green-500'}`}>
              {systemState.accident === "YES" ? "ACCIDENT!!" : "SECURE"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}