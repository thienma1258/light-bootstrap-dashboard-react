import { useDispatch } from "react-redux";

export const ADD_POST = "POSTS.ADD_POST";
export const DELETE_POST = "POSTS.DELETE_POST";
export const EDIT_POST = "POSTS.EDIT_POST";
export const UPDATE_POST = "POSTS.UPDATE_POST";
export const addPost = async (title, content) => async (dispatch) =>
  dispatch({
    type: types.ADD_POST,
    title,
    content,
  });

export const editPost = (id) => ({
  type: types.EDIT_POST,
  id,
});

export const updatePost = (id, newTitle, newContent) => ({
  type: types.UPDATE_POST,
  id,
  newTitle,
  newContent,
});

export const deletePost = (id) => ({
  type: types.DELETE_POST,
  id: id,
});
