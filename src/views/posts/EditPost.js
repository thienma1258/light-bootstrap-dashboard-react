import React from "react";
import { memo } from "react";
// react-bootstrap components
import { Container, Row, Col } from "react-bootstrap";

import { useHistory,useParams  } from "react-router-dom";
import  Post  from "./Post";

const EditPost = (props) => {
  const { id } = useParams()
  var nID = parseInt(id);
  if (isNaN(nID)){
    alert("not valid id");
  }

  let history = useHistory();


  const onCreateEdit = (val) => {
    history.push("/admin/posts");
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Post 
            id={nID}
            onSuccess={onCreateEdit}></Post>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default memo(EditPost);
