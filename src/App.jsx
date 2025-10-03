import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
// import Dashboard from "./components/Dashboard";
import Master from "./components/Master/Master";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import StudentDashboard from "./components/Student/StudentDashboard";

import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import ViewSchedule from "./components/Teacher/ViewSchedule";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ReportsAnalytics from "./components/Dashboard/ReportsAnalytics";


function App() {
  return (
    <Router>
      <Master>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/report" element={<ReportsAnalytics />} />
          <Route path="/viewschedule" element={<ViewSchedule />} />
        </Routes>
      </Master>
    </Router>
  );
}

export default App;