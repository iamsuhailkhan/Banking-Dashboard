import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="auth-landing">
      <div className="auth-card">
        <div className="auth-card-header">
          <h1>Banking Dashboard</h1>
          <ThemeToggle />
        </div>
        <p>Welcome! Create a new account or login if you already have one.</p>
        <div className="auth-actions">
          <Link className="auth-button" to="/signup">
            Signup
          </Link>
          <Link className="auth-button secondary" to="/login">
            Login
          </Link>
          <Link className="auth-button secondary" to="/admin-signup">
            Admin Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
