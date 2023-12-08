import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Wrong from '../../components/WrongButton/wrong';

function NoAccessPage() {
  return (
    <>
    <Header/>
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