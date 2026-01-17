import { createContext, useEffect, useState } from "react";

export const SystemContext = createContext();

export function SystemProvider({ children }) {
  const [systemState, setSystemState] = useState({
    occupancy: false,
    crowd: false,
    accident: false,
    brightness: "OFF",
    emergency: false,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:5000/api/status");
        const data = await res.json();
        setSystemState(data);
      } catch (e) {
        console.error("Backend not reachable");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SystemContext.Provider value={{ systemState }}>
      {children}
    </SystemContext.Provider>
  );
}
