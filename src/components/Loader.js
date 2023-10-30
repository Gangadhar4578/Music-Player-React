import React from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
const Loader = () => {
  return (
    <div className="loader-container">
        <div className='center-container'>
          <Row>
            <Spinner as={Col} animation="grow" variant="primary" />
            <br/>
            <Spinner as={Col} animation="grow" variant="info" />
            <br/>
            <Spinner as={Col} animation="grow" variant="secondary" />
          </Row>
          <br/>
          Loading ....
        </div>
    </div>
  );
};

export default Loader;