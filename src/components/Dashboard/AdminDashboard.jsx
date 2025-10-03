import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

// Import the static pages
import ManageStudents from "./ManageStudents";
import ManageFaculty from "./ManageFaculty";
import ManageClasses from "./ManageClasses";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "students":
        return <ManageStudents />;
      case "faculty":
        return <ManageFaculty />;
      case "classes":
        return <ManageClasses />;
      default:
        return (
          <div className="container mt-4 animate__animated animate__fadeIn">
            <h2>Welcome to Admin Dashboard</h2>
            <p>Use the sidebar to manage students, faculty, classes, and view reports.</p>

            <div className="row mt-4">
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-primary animate__animated animate__fadeInUp">
                  <div className="card-body">
                    <h5 className="card-title">Total Students</h5>
                    <p className="card-text fs-3">120</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-success animate__animated animate__fadeInUp animate__delay-1s">
                  <div className="card-body">
                    <h5 className="card-title">Total Faculty</h5>
                    <p className="card-text fs-3">15</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-warning animate__animated animate__fadeInUp animate__delay-2s">
                  <div className="card-body">
                    <h5 className="card-title">Total Classes</h5>
                    <p className="card-text fs-3">25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
        <h3 className="text-center mb-4">Admin Panel</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className="btn btn-dark text-start w-100"
              onClick={() => setActivePage("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className="btn btn-dark text-start w-100"
              onClick={() => setActivePage("students")}
            >
              Manage Students
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className="btn btn-dark text-start w-100"
              onClick={() => setActivePage("faculty")}
            >
              Manage Faculty
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className="btn btn-dark text-start w-100"
              onClick={() => setActivePage("classes")}
            >
              Manage Classes
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className="btn btn-dark text-start w-100"
              onClick={() => alert("Reports Page (Static for now)")}
            >
              Reports & Analytics
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">{renderPage()}</div>
    </div>
  );
};

export default AdminDashboard;
