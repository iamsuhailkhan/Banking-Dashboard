import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import ThemeToggle from "./ThemeToggle";

export default function AdminSignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, adminSecret }),
      });
      const data = await res.json();

      if (res.ok && data?.token) {
        dispatch(login({ email: data.email, token: data.token, role: data.role }));
        setSuccess("Admin signup successful. Redirecting...");
        setTimeout(() => navigate("/admin"), 800);
        return;
      }

      setError(data?.error || "Admin signup failed. Check your secret and try again.");
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
      console.error("Admin signup error:", err);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="auth-card-header">
          <h2>Admin Signup</h2>
          <ThemeToggle />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin secret"
          value={adminSecret}
          onChange={(e) => setAdminSecret(e.target.value)}
          required
        />
        <button type="submit">Create Admin</button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
