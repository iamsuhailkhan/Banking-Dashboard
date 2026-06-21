import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import TransactionTable from "../components/TransactionTable";
import ExpenseChart from "../components/ExpenseChart";
import TransactionForm from "../components/TransactionForm";

export default function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTransactions = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const stats = useMemo(() => {
    const total = transactions.length;
    const completed = transactions.filter((t) => t.status === "Completed").length;
    const pending = transactions.filter((t) => t.status === "Pending").length;
    const totalAmount = transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    return { total, completed, pending, totalAmount };
  }, [transactions]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTransactions(data);
        }
      })
      .catch(() => {
        setTransactions([]);
      });
  }, [token, refreshKey]);

  if (!token) {
    return <h2>Please login to view your dashboard</h2>;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Welcome, {user}</h1>
            <p className="intro-text">Manage transactions, track spending, and view your monthly trends in one place.</p>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Transactions</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="stat-card">
            <span>Total Spent</span>
            <strong>₹{stats.totalAmount.toLocaleString()}</strong>
          </div>
          <div className="stat-card">
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
          <div className="stat-card">
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>
        </section>

        <section className="panel-grid">
          <div className="panel">
            <TransactionForm onTransactionAdded={refreshTransactions} />
          </div>
          <div className="panel chart-card">
            <h2>Expense Trend</h2>
            <div className="chart-container">
              <ExpenseChart transactions={transactions} />
            </div>
          </div>
        </section>

        <section className="table-panel">
          <div className="section-head">
            <h2>Recent Transactions</h2>
            <p>Quick snapshot of your latest budget activity.</p>
          </div>
          <div className="table-wrapper">
            <TransactionTable transactions={transactions} />
          </div>
        </section>
      </main>
    </div>
  );
}
