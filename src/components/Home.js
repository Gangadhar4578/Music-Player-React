import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col,Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        {/* Left side with text */}
        <Col md={6}>
          <div className="text-left">
            <h1>Welcome to Our Music System</h1>
            <p>
                Explore a world of latest soundtracks from the movies and immerse yourself in a vast library of timeless songs.
            </p>
          </div>
          <Row>
                <Col>
                    <Button as={Link} to={`/movies`}>Movies</Button>
                </Col>
                <Col>
                    <Button as={Link} to={`/songs`}>Songs</Button>
                </Col>
                <Col>
                    <Button as={Link} to={`/player`}>Song Player</Button>
                </Col>
          </Row>
        </Col>

        {/* Right side with image */}
        <Col md={6}>
          <div className="text-center">
            <img
              src="/images/Home.svg"
              alt="Music System Image"
              className="img-fluid"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
