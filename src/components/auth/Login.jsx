import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded" style={{ width: "500px" }}>
        <h2 className="text-center text-primary mb-4">Attendance System</h2>

        <form onSubmit={handleSubmit}>
         
          <div className="mb-3">
            <label className="form-label fw-bold">Login As</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

      
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 mt-2">Login</button>
        </form>

        <p className="text-center text-muted mt-3">
          © 2025 Attendance System
        </p>
      </div>
    </div>
  );
}
