/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AddExtra = () => {
  let [extraTotalIDs, setExtraTotalIDs] = useState([]);

  const onAddExtra = () => {
    setExtraTotalIDs([...extraTotalIDs, extraTotalIDs.length + 1]);
  };

  return (
    <Container fluid>
      <p>Extra</p>
      {extraTotalIDs.map((item, index) => (
        <Row key={index}>
          <Col>
            <Form.Control type="text" placeholder="Label" />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Value" />
          </Col>
        </Row>
      ))}
      <Button onClick={onAddExtra} variaty="success">
        Add Extra
      </Button>
    </Container>
  );
};

export default AddExtra;
