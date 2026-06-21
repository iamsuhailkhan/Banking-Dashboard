import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import AdminUserChart from "../components/AdminUserChart";
import AdminStatusChart from "../components/AdminStatusChart";
import AdminUserManagement from "../components/AdminUserManagement";

export default function AdminDashboard() {
  const { token, role, user } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!alert && !error) return;
    const timer = setTimeout(() => {
      setAlert(null);
      setError(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [alert, error]);

  const fetchTransactions = () => {
    if (role !== "admin" || !token) return;

    fetch("http://localhost:5000/api/transactions/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setStats({
          total: data.length,
          completed: data.filter((t) => t.status === "Completed").length,
          pending: data.filter((t) => t.status === "Pending").length,
        });
      });
  };

  const fetchUsers = () => {
    if (role !== "admin" || !token) return;

    fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        }
      });
  };

  useEffect(() => {
    fetchTransactions();
    fetchUsers();
  }, [role, token]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user and all their transactions?")) {
      return;
    }

    const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      fetchTransactions();
      setAlert("User deleted successfully.");
      return;
    }

    const data = await res.json();
    setError(data?.error || "Unable to delete user.");
  };

  const handleToggleStatus = async (transactionId, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    const res = await fetch(`http://localhost:5000/api/transactions/${transactionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      fetchTransactions();
      setAlert(`Transaction marked ${newStatus}.`);
      return;
    }

    const data = await res.json();
    setError(data?.error || "Unable to update transaction.");
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (!window.confirm("Delete this transaction permanently?")) {
      return;
    }

    const res = await fetch(`http://localhost:5000/api/transactions/${transactionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      fetchTransactions();
      setAlert("Transaction deleted successfully.");
      return;
    }

    const data = await res.json();
    setError(data?.error || "Unable to delete transaction.");
  };

  if (role !== "admin") {
    return <h2>Access denied: Admins only</h2>;
  }

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Admin Overview</p>
            <h1>Admin Dashboard</h1>
            <p className="intro-text">Review platform activity, monitor transaction flow, and keep operations in order.</p>
          </div>
        </header>

        {alert && <div className="notice success">{alert}</div>}
        {error && <div className="notice error">{error}</div>}

        <section className="stats-grid admin-stats">
          <div className="stat-card">
            <span>Total Transactions</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="stat-card">
            <span>Total Users</span>
            <strong>{users.length}</strong>
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

        <section className="panel-grid admin-charts">
          <div className="panel chart-card">
            <h2>Transactions by User</h2>
            <AdminUserChart transactions={transactions} />
          </div>
          <div className="panel chart-card">
            <h2>Status Breakdown</h2>
            <AdminStatusChart transactions={transactions} />
          </div>
        </section>

        <AdminUserManagement users={users} currentAdminEmail={user} onDeleteUser={handleDeleteUser} />

        <section className="table-panel">
          <div className="section-head">
            <h2>All Transactions</h2>
            <p>See every transaction across the platform in a clean table view.</p>
          </div>
          <div className="table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id}>
                    <td>{tx.userId?.email || tx.userId}</td>
                    <td>{tx.date}</td>
                    <td>{tx.desc}</td>
                    <td>₹{tx.amount}</td>
                    <td>{tx.status}</td>
                    <td>
                      <div className="transaction-actions">
                        <button
                          type="button"
                          className="action-button"
                          disabled={tx.status === "Completed"}
                          onClick={() => handleToggleStatus(tx._id, tx.status)}
                        >
                          {tx.status === "Pending" ? "Mark Completed" : "Completed"}
                        </button>
                        <button
                          type="button"
                          className="action-button delete"
                          onClick={() => handleDeleteTransaction(tx._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
