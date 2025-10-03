import React from "react";

const ManageFaculty = () => {
  const facultyList = [
    { id: 1, name: "Dr. Anil Kumar", department: "CSE", email: "anil@example.com" },
    { id: 2, name: "Dr. Sanya Mehta", department: "ECE", email: "sanya@example.com" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 animate__animated animate__fadeInDown">Manage Faculty</h2>
      <table className="table table-striped table-bordered animate__animated animate__fadeInUp">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.map((faculty) => (
            <tr key={faculty.id}>
              <td>{faculty.id}</td>
              <td>{faculty.name}</td>
              <td>{faculty.department}</td>
              <td>{faculty.email}</td>
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

export default ManageFaculty;
