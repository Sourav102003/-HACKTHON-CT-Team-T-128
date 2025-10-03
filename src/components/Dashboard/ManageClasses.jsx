import React from "react";

const ManageClasses = () => {
  const classes = [
    { id: 1, name: "CSE101", subject: "Data Structures", faculty: "Dr. Anil Kumar", time: "Mon 10-12 AM" },
    { id: 2, name: "CSE102", subject: "Algorithms", faculty: "Dr. Sanya Mehta", time: "Tue 2-4 PM" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 animate__animated animate__fadeInDown">Manage Classes</h2>
      <table className="table table-striped table-bordered animate__animated animate__fadeInUp">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Class Name</th>
            <th>Subject</th>
            <th>Faculty</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>{cls.name}</td>
              <td>{cls.subject}</td>
              <td>{cls.faculty}</td>
              <td>{cls.time}</td>
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

export default ManageClasses;
