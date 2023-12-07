import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function NotFoundPage() {
  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1 className="mt-5">404 Not Found</h1>
          <p className="lead">The page you are looking for doesn't exist or another error occurred.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;