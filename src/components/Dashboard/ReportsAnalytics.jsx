import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ReportsAnalytics = () => {

  // Dummy Data for charts
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Average Attendance %",
        data: [85, 88, 82, 90, 87, 89],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["Math", "Science", "English", "History", "PE"],
    datasets: [
      {
        label: "Subject-wise Attendance %",
        data: [88, 92, 85, 80, 95],
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: ["#4e73df", "#e74a3b", "#f6c23e"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 animate__animated animate__fadeIn">Reports & Analytics</h2>
      
      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3 animate__animated animate__fadeInUp">
            <div className="card-body text-center">
              <h5 className="card-title">Total Students</h5>
              <p className="card-text display-6">120</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3 animate__animated animate__fadeInUp animate__delay-1s">
            <div className="card-body text-center">
              <h5 className="card-title">Average Attendance</h5>
              <p className="card-text display-6">88%</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3 animate__animated animate__fadeInUp animate__delay-2s">
            <div className="card-body text-center">
              <h5 className="card-title">Classes Today</h5>
              <p className="card-text display-6">6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-4 animate__animated animate__fadeInLeft">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Monthly Attendance Trend</h5>
            <Line data={lineData} />
          </div>
        </div>
        <div className="col-md-6 mb-4 animate__animated animate__fadeInRight">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Subject-wise Attendance</h5>
            <Bar data={barData} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4 animate__animated animate__fadeInUp">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Attendance Status Distribution</h5>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="col-md-6 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Recent Attendance Records</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Math</td>
                  <td className="text-success">Present</td>
                  <td>03-Oct-2025</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>Science</td>
                  <td className="text-danger">Absent</td>
                  <td>03-Oct-2025</td>
                </tr>
                <tr>
                  <td>Mark Lee</td>
                  <td>English</td>
                  <td className="text-warning">Late</td>
                  <td>03-Oct-2025</td>
                </tr>
                <tr>
                  <td>Emily Clark</td>
                  <td>History</td>
                  <td className="text-success">Present</td>
                  <td>03-Oct-2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
