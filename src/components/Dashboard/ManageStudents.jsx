import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const ManageStudents = () => {
  // Static data
  const students = [
    { id: 1, name: "Deepak Kumar", rollNo: "CSE101", class: "CSE", email: "deepak@example.com" },
    { id: 2, name: "Priya Sharma", rollNo: "CSE102", class: "CSE", email: "priya@example.com" },
    { id: 3, name: "Rohit Singh", rollNo: "CSE103", class: "CSE", email: "rohit@example.com" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 animate__animated animate__fadeInDown">Manage Students</h2>
      <table className="table table-striped table-bordered animate__animated animate__fadeInUp">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.class}</td>
              <td>{student.email}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
