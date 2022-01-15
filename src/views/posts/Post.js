import React from "react";
import { useState, memo, useEffect } from "react";
// react-bootstrap components
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import ImagePicker from "../../components/ImagePicker/ImagePicker";
import TextEditor from "../../components/Editor/Editor";

import PostService from "../../api/PostService";
import { ENTITY_TYPE_POST } from "../../constant/entityType.js";
import { useHistory } from "react-router-dom";
import  AddExtra  from "../../components/Extra/Extra";

const Post = (props) => {
  let history = useHistory();
  const [post, setPost] = useState({
    name: "",
    published: "",
    thumbnail: "",
  });

  const [bodyPayload, setBody] = useState(null);
  const [id, setID] = useState(0);

  const [loading, setIsLoading] = useState(false);

  useEffect(async () => {
    if (typeof props.id !== "undefined") {
      setIsLoading(true);
      setID(props.id);
      let postMap = await PostService.getByIDs(
        [props.id],
        ["author", "name", "image", "title"]
      );
      if (typeof postMap !== "undefined") {
        const post = postMap[`${ENTITY_TYPE_POST}-${props.id}`];
        const published = post.published ? 1 : 0;
        console.log(published);
        setPost({
          name: post.title,
          published: published,
          thumbnail: post.image,
        });
        setBody(post.body);
      }
      setIsLoading(false);
    } else {
      setBody("new posts");
    }
  }, []);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleChangeField = (name) => {
    return (val) => {
      if (typeof val !== "undefined") {
        console.log(post, val);
        setPost({ ...post, [name]: val });
      }
    };
  };

  const onSubmitCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //create posts
    var isPublished = post.published === "1";

    var result = await PostService.create(
      post.name,
      bodyPayload,
      post.thumbnail,
      {},
      isPublished
    );
    setIsLoading(false);
    if (typeof result !== "undefined" && result.code === 0) {
      alert("create success");
      props.onSuccess(result.data);
    } else {
      alert("fail create " + result.data);
    }
  };

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //create posts
    var isPublished = post.published === "1";

    var result = await PostService.update(
      id,
      post.name,
      bodyPayload,
      post.thumbnail,
      {},
      isPublished
    );

    setIsLoading(false);
    if (typeof result !== "undefined" && result.code === 0) {
      alert("edit success");
      props.onSuccess(result.data);
    } else {
      alert("fail edit " + result.data);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  onChange={handleChange}
                  value={post.name}
                />
              </Form.Group>
              <Form.Group controlId="published">
                <Form.Label>Published</Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  value={post.published}
                  name="published"
                  onChange={handleChange}
                >
                  <option>Open this select menu</option>
                  <option value="1">Published</option>
                  <option value="0">Unpublished</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="form.image">
                <Form.Label>Image</Form.Label>
                <img src={post.thumbnail} />
                <ImagePicker
                  name="thumbnail"
                  updateImageURL={handleChangeField("thumbnail")}
                ></ImagePicker>
              </Form.Group>
              <AddExtra></AddExtra>
              <Form.Group controlId="form.body">
                <Form.Label>Body</Form.Label>
                <TextEditor
                  initText={bodyPayload}
                  onChange={setBody}
                ></TextEditor>
              </Form.Group>
              {id == 0 ? (
                <Button disabled={loading} onClick={onSubmitCreate}>
                  Create
                </Button>
              ) : (
                <Button
                  variant="success"
                  disabled={loading}
                  onClick={onSubmitEdit}
                >
                  Edit
                </Button>
              )}
              <p></p>
              <Spinner animation="border" hidden={!loading} />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default memo(Post);
