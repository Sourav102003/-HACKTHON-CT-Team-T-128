import React from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

const ViewSchedule = () => {
  // Dummy schedule data
  const schedule = [
    { day: "Monday", classes: ["CS101 - 9:00 AM", "CS102 - 11:00 AM", "CS103 - 2:00 PM"] },
    { day: "Tuesday", classes: ["CS201 - 10:00 AM", "CS202 - 1:00 PM"] },
    { day: "Wednesday", classes: ["CS101 - 9:00 AM", "CS104 - 3:00 PM"] },
    { day: "Thursday", classes: ["CS102 - 11:00 AM", "CS203 - 2:00 PM"] },
    { day: "Friday", classes: ["CS105 - 10:00 AM", "CS201 - 1:00 PM"] },
  ];

  return (
    <Container className="mt-4 animate__animated animate__fadeIn">
      <h2 className="mb-4 text-center">
        <FaCalendarAlt className="me-2 text-primary" />
        Weekly Schedule
      </h2>

      <Row>
        {schedule.map((daySchedule, idx) => (
          <Col md={6} lg={4} key={idx} className="mb-4">
            <Card className="shadow animate__animated animate__fadeInUp">
              <Card.Body>
                <Card.Title className="text-center">{daySchedule.day}</Card.Title>
                <Table striped bordered hover size="sm" className="mt-3">
                  <tbody>
                    {daySchedule.classes.map((cls, i) => (
                      <tr key={i}>
                        <td>{cls}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center mt-2">
                  <Button variant="primary">Add Class</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewSchedule;
