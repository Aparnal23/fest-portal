import { createContext, useContext, useEffect, useState } from "react";

const ModeContext = createContext(null);

function initialMode() {
  try {
    const saved = localStorage.getItem("fp_mode");
    if (saved) return saved;
  } catch { /* ignore */ }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "night" : "day";
}

export function ModeProvider({ children }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    try { localStorage.setItem("fp_mode", mode); } catch { /* ignore */ }
  }, [mode]);

  const flip = () => setMode((m) => (m === "day" ? "night" : "day"));

  return <ModeContext.Provider value={{ mode, flip }}>{children}</ModeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMode = () => useContext(ModeContext);
