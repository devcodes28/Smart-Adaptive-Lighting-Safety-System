import { createContext, useState } from "react";

export const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [state, setState] = useState({
    crowd: false,
    accident: false,
    brightness: "MEDIUM",
    priority: "P2_NORMAL",
  });

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <SystemContext.Provider value={{ state, updateState }}>
      {children}
    </SystemContext.Provider>
  );
};
