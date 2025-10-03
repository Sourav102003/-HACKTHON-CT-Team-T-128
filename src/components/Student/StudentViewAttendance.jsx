import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const StudentViewAttendance = () => {
  // Static dummy data
  const overallAttendance = 82; // in %
  const subjects = [
    { name: "Mathematics", attended: 18, total: 22 },
    { name: "Physics", attended: 15, total: 20 },
    { name: "Chemistry", attended: 12, total: 18 },
    { name: "Computer Science", attended: 20, total: 24 },
  ];

  const attendanceRecords = [
    { date: "2025-09-01", subject: "Mathematics", status: "Present" },
    { date: "2025-09-01", subject: "Physics", status: "Absent" },
    { date: "2025-09-02", subject: "Computer Science", status: "Present" },
    { date: "2025-09-03", subject: "Chemistry", status: "Present" },
    { date: "2025-09-03", subject: "Physics", status: "Present" },
  ];

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="text-primary mb-4">📊 My Attendance</h2>

      {/* Overall Attendance */}
      <div className="card shadow-sm mb-4">
        <div className="card-body text-center">
          <h4>Overall Attendance</h4>
          <h2
            className={`fw-bold ${
              overallAttendance < 75 ? "text-danger" : "text-success"
            }`}
          >
            {overallAttendance}%
          </h2>
          <p>
            {overallAttendance < 75
              ? "⚠️ Your attendance is below the required level!"
              : "✅ Good job! Keep it up."}
          </p>
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <h4 className="mb-3">📚 Subject-wise Attendance</h4>
      {subjects.map((sub, index) => {
        const percentage = ((sub.attended / sub.total) * 100).toFixed(1);
        return (
          <div key={index} className="mb-3">
            <label className="fw-bold">{sub.name}</label>
            <div className="progress">
              <div
                className={`progress-bar ${
                  percentage < 75 ? "bg-danger" : "bg-success"
                }`}
                role="progressbar"
                style={{ width: `${percentage}%` }}
              >
                {percentage}%
              </div>
            </div>
            <small>
              {sub.attended}/{sub.total} classes attended
            </small>
          </div>
        );
      })}

      {/* Attendance Records */}
      <h4 className="mt-4">🗓️ Attendance Records</h4>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.subject}</td>
              <td
                className={`fw-bold ${
                  record.status === "Present" ? "text-success" : "text-danger"
                }`}
              >
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentViewAttendance;
