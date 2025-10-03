// src/pages/student/StudentDashboard.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Button, Table, ListGroup } from "react-bootstrap";
// import axios from "axios";
import { FaBell, FaBook, FaUser } from "react-icons/fa";

const StudentDashboard = () => {
  const [attendanceSummary, setAttendanceSummary] = useState({
    overall: 0,
    subjects: [],
    lowSubjects: [],
    upcomingClasses: [],
    notifications: [],
  });

  // useEffect(() => {
  //   // Fetch attendance data from backend
  //   axios
  //     .get("/api/student/attendance")
  //     .then((res) => {
  //       setAttendanceSummary(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Welcome, John Doe!</h2>

      {/* Profile & Quick Info */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaUser size={50} className="mb-2 text-primary" />
              <Card.Title>John Doe</Card.Title>
              <Card.Text>Student ID: 12345</Card.Text>
              <Card.Text>Course: B.Tech CSE</Card.Text>
              <Button variant="primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Overall Attendance */}
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Overall Attendance</Card.Title>
              <ProgressBar
                now={attendanceSummary.overall}
                label={`${attendanceSummary.overall}%`}
                className="mb-2"
              />
              {attendanceSummary.overall < 75 && (
                <div className="text-danger mt-2">⚠ Low Attendance! Improve soon.</div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <Button variant="primary" className="me-2 mb-2">
                Scan QR
              </Button>
              <Button variant="success" className="me-2 mb-2">
                View History
              </Button>
              <Button variant="info" className="mb-2">
                <FaBell /> Notifications
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Subject-wise Attendance */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Subject-wise Attendance</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceSummary.subjects.length > 0 ? (
                    attendanceSummary.subjects.map((sub, idx) => (
                      <tr key={idx}>
                        <td>{sub.name}</td>
                        <td>
                          <ProgressBar
                            now={sub.percentage}
                            label={`${sub.percentage}%`}
                            variant={sub.percentage < 75 ? "danger" : "success"}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upcoming Classes & Notifications */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaBook className="me-2 text-primary" />
                Upcoming Classes
              </Card.Title>
              <ListGroup variant="flush">
                {attendanceSummary.upcomingClasses.length > 0 ? (
                  attendanceSummary.upcomingClasses.map((cls, idx) => (
                    <ListGroup.Item key={idx}>
                      {cls.subject} - {cls.time} ({cls.faculty})
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No upcoming classes</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaBell className="me-2 text-warning" />
                Recent Notifications
              </Card.Title>
              <ListGroup variant="flush">
                {attendanceSummary.notifications.length > 0 ? (
                  attendanceSummary.notifications.map((note, idx) => (
                    <ListGroup.Item key={idx}>{note}</ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No notifications</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
