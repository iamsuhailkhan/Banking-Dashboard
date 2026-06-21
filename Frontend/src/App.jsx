import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AdminSignupForm from "./components/AdminSignupForm";
import "./styles/_dashboard.scss";
import "./styles/_admin.scss";

function App() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? (role === "admin" ? <Navigate to="/admin" /> : <Dashboard />) : <LandingPage />} />
        <Route path="/login" element={!token ? <LoginForm /> : <Navigate to={role === "admin" ? "/admin" : "/"} />} />
        <Route path="/signup" element={!token ? <SignupForm /> : <Navigate to={role === "admin" ? "/admin" : "/"} />} />
        <Route path="/admin-signup" element={!token ? <AdminSignupForm /> : <Navigate to={role === "admin" ? "/admin" : "/"} />} />
        <Route
          path="/admin"
          element={token ? (role === "admin" ? <AdminDashboard /> : <Navigate to="/" />) : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
