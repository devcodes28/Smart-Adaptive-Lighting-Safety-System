import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from "../components/Sidebar";

export default function VisionAnalytics() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const newPoint = { time, density: Math.floor(Math.random() * 10) };
      setHistory(prev => [...prev.slice(-9), newPoint]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-200">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-8">Vision & Crowd Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simulated Smartphone Feed */}
          <div className="glass-card overflow-hidden relative group">
            <h3 className="text-xs text-slate-500 uppercase font-bold mb-4 tracking-widest">Mobile Camera Input</h3>
            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden">
              <span className="text-slate-700 font-mono italic animate-pulse">Establishing Secure Stream...</span>
              
              {/* Virtual Bounding Box */}
              <div className="absolute top-1/4 left-1/4 w-32 h-56 border-2 border-neon-cyan rounded-sm shadow-[0_0_10px_#06b6d4]">
                <span className="absolute -top-6 left-0 text-[10px] bg-neon-cyan text-black px-1 font-bold">HUMAN_01: 98%</span>
              </div>
            </div>
            {/* Visual HUD Scanning Effect */}
            <div className="absolute inset-0 pointer-events-none border border-neon-cyan/10 rounded-2xl" />
          </div>

          {/* Crowd Analytics Chart */}
          <div className="glass-card">
            <h3 className="text-xs text-slate-500 uppercase font-bold mb-4 tracking-widest">Historical Density Analysis</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#06b6d4' }}
                  />
                  <Line type="monotone" dataKey="density" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} activeDot={{ r: 6, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}