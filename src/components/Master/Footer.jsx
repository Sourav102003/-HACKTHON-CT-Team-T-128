import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>AttendanceSys</h5>
            <p>© {new Date().getFullYear()} AttendanceSys. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>Follow us:</p>
            <a href="#" className="text-white me-3">Facebook</a>
            <a href="#" className="text-white me-3">Twitter</a>
            <a href="#" className="text-white">LinkedIn</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
