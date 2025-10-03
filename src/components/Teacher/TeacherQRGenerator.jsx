import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherQRGenerator = () => {
  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    time: "",
    day: "",
    classroom: "",
  });

  const [qrValue, setQrValue] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateQR = (e) => {
    e.preventDefault();
    const qrData = JSON.stringify(formData);
    setQrValue(qrData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4 text-center">
        🎓 Generate QR Code for Class Attendance
      </h2>

      {/* Form */}
      <div className="card shadow p-4">
        <form onSubmit={generateQR}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Subject Name</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="Enter Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Day</label>
              <input
                type="text"
                name="day"
                className="form-control"
                placeholder="e.g. Monday"
                value={formData.day}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Class Time</label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Classroom / Venue</label>
              <input
                type="text"
                name="classroom"
                className="form-control"
                placeholder="Enter Classroom No."
                value={formData.classroom}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Generate QR Code
          </button>
        </form>
      </div>

      {/* QR Code Display */}
      {qrValue && (
        <div className="text-center mt-5">
          <h4>📌 QR Code Generated</h4>
          <QRCodeCanvas value={qrValue} size={200} includeMargin={true} />
          <p className="mt-3 text-muted">
            Students can scan this QR to mark attendance.
          </p>
        </div>
      )}
    </div>
  );
};

export default TeacherQRGenerator;
