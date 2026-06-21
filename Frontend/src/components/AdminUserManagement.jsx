import React from "react";

export default function AdminUserManagement({ users, currentAdminEmail, onDeleteUser }) {
  return (
    <section className="table-panel user-management-panel">
      <div className="section-head">
        <h2>User Management</h2>
        <p>Remove users and keep the platform clean from inactive accounts.</p>
      </div>
      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.email === currentAdminEmail ? (
                    <span className="muted">Current admin</span>
                  ) : (
                    <button
                      type="button"
                      className="action-button delete"
                      onClick={() => onDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
