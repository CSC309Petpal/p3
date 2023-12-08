import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StartHeader from '../../components/StartHeader/startHeader';
import Footer from '../../components/Footer/footer';
import Wrong from '../../components/WrongButton/wrong';

function NoAccessPage() {
  return (
    <>
    <StartHeader/>
    <Container className="text-center">
      <Row>
        <Col>
          <h1 className="mt-5">You don't have access to this page</h1>
          <Wrong/>
          
          
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
}

export default NoAccessPage;