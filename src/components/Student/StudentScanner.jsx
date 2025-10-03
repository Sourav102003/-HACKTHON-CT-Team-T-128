import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function StudentScanner() {
  const [data, setData] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleScan = async (result) => {
    if (result) {
      try {
        const parsedData = JSON.parse(result?.text); // QR contains JSON string
        setData(parsedData);

        // Send attendance to backend
        const response = await fetch("http://localhost:5000/api/attendance/mark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId,
            ...parsedData,
            status: "Present",
          }),
        });

        if (response.ok) {
          alert("Attendance marked successfully ✅");
        } else {
          alert("Error marking attendance ❌");
        }
      } catch (err) {
        console.error("QR Parse error:", err);
      }
    }
  };

  return (
    <div>
      <h2>Student Attendance Scanner</h2>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <QrReader
        onResult={(result, error) => {
          if (!!result) handleScan(result);
        }}
        style={{ width: "100%" }}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
