// src/pages/student/ScanQR.jsx
import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { QrReader } from "react-qr-reader";
import axios from "axios";

/**
 * Student scans the QR shown by teacher. On successful scan, sends a request to backend:
 * POST /api/attendance/mark { studentId, sessionId }
 *
 * Replace studentId with logged-in student id (or read from auth token).
 */
export default function ScanQR() {
  const [scanned, setScanned] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [sessionValue, setSessionValue] = useState(null);

  // Replace with actual logged-in student id (from auth)
  const studentId = "student_12345";

  const handleResult = async (result, error) => {
    if (!!result) {
      const sessionId = result?.text?.trim();
      if (!sessionId) return;
      setSessionValue(sessionId);
      setScanned(true);
      setMessage("Scanned session. Verifying...");

      try {
        const res = await axios.post("/api/attendance/mark", {
          studentId,
          sessionId,
        });
        if (res.data?.success) {
          setMessage("Attendance marked ✅");
          setError(null);
        } else {
          setMessage(null);
          setError(res.data?.message || "Could not mark attendance");
        }
      } catch (err) {
        setMessage(null);
        setError(err.response?.data?.message || err.message || "Server error");
      }
    }
    if (!!error) {
      // handle camera/scan errors
      console.warn(error);
    }
  };

  const reset = () => {
    setScanned(false);
    setMessage(null);
    setError(null);
    setSessionValue(null);
  };

  return (
    <div className="container mt-4">
      <h3>Scan QR to Mark Attendance</h3>
      <Card className="p-3 shadow-sm" style={{ maxWidth: 600 }}>
        <div className="mb-3">
          {!scanned ? (
            <>
              <p className="text-muted">Point your camera at the teacher's QR code.</p>
              <div style={{ width: "100%" }}>
                <QrReader
                  onResult={handleResult}
                  containerStyle={{ width: "100%" }}
                  constraints={{ facingMode: "environment" }}
                />
              </div>
            </>
          ) : (
            <>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <p><strong>Session:</strong> {sessionValue}</p>
              <Button variant="secondary" onClick={reset}>Scan Again</Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
