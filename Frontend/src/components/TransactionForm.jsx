import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function TransactionForm({ onTransactionAdded }) {
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("You must be logged in to add a transaction.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date, desc, amount: Number(amount), status }),
    });

    const data = await res.json();
    if (res.ok) {
      setDate("");
      setDesc("");
      setAmount(0);
      setStatus("Pending");
      onTransactionAdded?.();
    } else {
      setError(data.error || "Unable to add transaction.");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-grid">
        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Description
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} required />
        </label>
        <label>
          Amount
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
}
