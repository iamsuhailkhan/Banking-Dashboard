import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import ThemeToggle from "./ThemeToggle";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      dispatch(login({ email: data.email, token: data.token, role: data.role }));
      navigate(data.role === "admin" ? "/admin" : "/");
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="auth-card-header">
          <h2>Login</h2>
          <ThemeToggle />
        </div>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
