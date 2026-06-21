import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <button type="button" className="theme-toggle-button" onClick={toggle}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
