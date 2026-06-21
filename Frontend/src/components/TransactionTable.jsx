import React from "react";

export default function TransactionTable({ transactions }) {
  return (
    <div>
      <h2>My Transactions</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.date}</td>
              <td>{tx.desc}</td>
              <td>₹{tx.amount}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
