import React from "react";
import { memo } from "react";
// react-bootstrap components
import { Container, Row, Col } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import  Post  from "./Post";

const AddPost = (props) => {
  let history = useHistory();

  const onCreateSuccess = (val) => {
    history.push("/admin/posts");
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Post
             onSuccess={onCreateSuccess}>

             </Post>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default memo(AddPost);
