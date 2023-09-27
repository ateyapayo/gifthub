import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggle = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("modeMyPack", newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("modeMyPack") || null;

    if (window.location.hash === "#light-mode") {
      setMode("light");
      localStorage.setItem("modeMyPack", "light");
    } else if (window.location.hash === "#dark-mode") {
      setMode("dark");
      localStorage.setItem("modeMyPack", "dark");
    } else if (!window.location.hash) {
      setMode(savedMode || "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
