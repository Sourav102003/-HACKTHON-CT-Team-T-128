import React, { useState } from "react";

const AdminAddStudent = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    semester: "",
    contact: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePassword = () => Math.random().toString(36).slice(-8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.rollNumber) {
      alert("Name, Email, and Roll Number are required!");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      ...formData,
      password: generatePassword(),
    };

    setStudents([...students, newStudent]);
    alert(`Student added! Generated password: ${newStudent.password}`);
    setFormData({
      name: "",
      email: "",
      rollNumber: "",
      department: "",
      semester: "",
      contact: "",
      status: "Active",
    });
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Add New Student</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Student Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Reg Number</label>
            <input
              type="text"
              className="form-control"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Enter roll number"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Semester</label>
            <input
              type="text"
              className="form-control"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="Enter semester"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Student
        </button>
      </form>

      <h4 className="mt-5">Existing Students</h4>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Reg Number</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.rollNumber}</td>
              <td>{s.department}</td>
              <td>{s.semester}</td>
              <td>{s.contact}</td>
              <td>{s.status}</td>
              <td>{s.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAddStudent;
