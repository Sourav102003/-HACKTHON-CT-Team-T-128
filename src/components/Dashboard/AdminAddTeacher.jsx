import React, { useState } from "react";

const AdminAddTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    department: "",
    subjects: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePassword = () => Math.random().toString(36).slice(-8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required!");
      return;
    }

    const newTeacher = {
      id: teachers.length + 1,
      ...formData,
      password: generatePassword(),
    };

    setTeachers([...teachers, newTeacher]);
    alert(`Teacher added! Generated password: ${newTeacher.password}`);
    setFormData({
      name: "",
      email: "",
      regno: "",
      contact: "",
      department: "",
      subjects: "",
      status: "Active",
    });
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Add New Teacher</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Teacher Name</label>
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
            <label className="form-label">Reg No</label>
            <input
              type="regno"
              className="form-control"
              name="regno"
              value={formData.regno}
              onChange={handleChange}
              placeholder="Enter Reg Number"
            />
          </div>
        </div>

        <div className="row">
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
            <label className="form-label">Subjects</label>
            <input
              type="text"
              className="form-control"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              placeholder="Enter subjects"
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
          Add Teacher
        </button>
      </form>

      <h4 className="mt-5">Existing Teachers</h4>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Subjects</th>
            <th>Status</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.contact}</td>
              <td>{t.department}</td>
              <td>{t.subjects}</td>
              <td>{t.status}</td>
              <td>{t.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAddTeacher;
