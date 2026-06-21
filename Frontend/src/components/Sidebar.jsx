import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

export default function Sidebar() {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="sidebar">
      <h2>Banking Menu</h2>
      <ul>
        {token ? (
          <>
            <li><Link to="/">Dashboard</Link></li>
            {role === "admin" && <li><Link to="/admin">Admin Dashboard</Link></li>}
            <li><button type="button" onClick={handleLogout}>Logout</button></li>
            <li><button type="button" onClick={toggleTheme}>{theme === "dark" ? "Light Mode" : "Dark Mode"}</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><button type="button" onClick={toggleTheme}>{theme === "dark" ? "Light Mode" : "Dark Mode"}</button></li>
          </>
        )}
      </ul>
    </div>
  );
}
