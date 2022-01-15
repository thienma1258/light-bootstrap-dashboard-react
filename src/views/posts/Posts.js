import { React, useEffect, useState } from "react";

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import PaginationList from "../../components/Pagination/Pagination";
import { useHistory } from "react-router-dom";

import PostService from "../../api/PostService";
import "./post.css";

var initPost = [];

function PostsList() {
  var [ids, setIDs] = useState([]);
  var [items, setItems] = useState([]);
  let history = useHistory();

  const onChange = async (idsProcess) => {
    var itemMap = await PostService.getByIDs(idsProcess, [
      "name",
      "image",
      "published",
    ]);
    var items = Object.values(itemMap);
    var result = [];
    for (const id of idsProcess) {
      result.push(itemMap[`post-${id}`]);
    }
    setItems(result);
  };

  const reloadIDs = async () => {
    var ids = await PostService.getAllIDs();
    setIDs(ids);
  };

  useEffect(async () => {
    await reloadIDs();
  }, []);

  const editPost = (id) => {
    history.push(`/admin/posts/${id}`);
  };

  const redirectToCreateNew = () => {
    history.push(`/admin/posts/create`);
  };

  const deletePost = async (id) => {
    var result = await PostService.delete(id);
    console.log(result);
    await reloadIDs();
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Posts</Card.Title>
                <p className="card-category">List posts</p>
                <Button
                            className="float-right"
                            variant="success"
                            onClick={(e) => redirectToCreateNew()}
                          >
                            Create
                          </Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Row>
                  {items.map((item, index) => (
                    <Col md="4">
                      <Card key={index}>
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Img
                            className="card-img-top"
                            variant="top"
                            src={item.image}
                          />
                          <ListGroup className="list-group-flush">
                            <ListGroupItem>
                              createdAt: {item.createdAt}
                            </ListGroupItem>
                            <ListGroupItem>
                              author: {item.author} {item.published}{" "}
                            </ListGroupItem>
                            {item.published ? (
                              <ListGroupItem>Published</ListGroupItem>
                            ) : (
                              ""
                            )}
                          </ListGroup>
                          <Button onClick={(e) => editPost(item.id)}>
                            Edit
                          </Button>
                          <Button
                            className="float-right"
                            variant="danger"
                            onClick={(e) => deletePost(item.id)}
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <PaginationList
                  items={ids}
                  onChangePage={onChange}
                ></PaginationList>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PostsList;
