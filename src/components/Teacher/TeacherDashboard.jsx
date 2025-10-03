import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Table, ListGroup, ProgressBar } from "react-bootstrap";
import { FaUser, FaCalendarAlt, FaQrcode, FaBell, FaClipboardList } from "react-icons/fa";

const TeacherDashboard = () => {
  // Dummy data for frontend visualization
  const [dashboardData] = useState({
    profile: { name: "John Doe", id: "T001", department: "CSE" },
    todaysClasses: ["CS101", "CS102", "CS103"],
    subjects: [
      { name: "CS101", percentage: 90 },
      { name: "CS102", percentage: 72 },
      { name: "CS103", percentage: 85 },
    ],
    notifications: ["CS102 attendance low", "Exam schedule updated"],
  });

  return (
    <Container className="mt-4">
      <h2 className="mb-4 animate__animated animate__fadeInDown">
        Welcome, {dashboardData.profile.name}!
      </h2>

      {/* Profile & Quick Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow animate__animated animate__fadeInLeft">
            <Card.Body className="text-center">
              <FaUser size={50} className="mb-2 text-primary" />
              <Card.Title>{dashboardData.profile.name}</Card.Title>
              <Card.Text>ID: {dashboardData.profile.id}</Card.Text>
              <Card.Text>Department: {dashboardData.profile.department}</Card.Text>
              <Button variant="primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Row>
            <Col md={6}>
              <Card className="shadow mb-3 animate__animated animate__fadeInRight">
                <Card.Body className="text-center">
                  <FaCalendarAlt size={30} className="mb-2 text-success"/>
                  <Card.Title>Today's Classes</Card.Title>
                  <Card.Text>{dashboardData.todaysClasses.length}</Card.Text>
                  <Button variant="success">View Schedule</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow mb-3 animate__animated animate__fadeInRight">
                <Card.Body className="text-center">
                  <FaQrcode size={30} className="mb-2 text-warning"/>
                  <Card.Title>Generate QR</Card.Title>
                  <Card.Text>Click to generate attendance QR for class</Card.Text>
                  <Button variant="warning">Generate QR</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Subject-wise Attendance */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow animate__animated animate__fadeInUp">
            <Card.Body>
              <Card.Title>
                <FaClipboardList className="me-2 text-primary" />
                Subject-wise Attendance
              </Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.subjects.map((sub, idx) => (
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
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notifications */}
      <Row>
        <Col md={12}>
          <Card className="shadow animate__animated animate__fadeInUp">
            <Card.Body>
              <Card.Title>
                <FaBell className="me-2 text-warning" />
                Notifications
              </Card.Title>
              <ListGroup variant="flush">
                {dashboardData.notifications.map((note, idx) => (
                  <ListGroup.Item key={idx}>{note}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherDashboard;
