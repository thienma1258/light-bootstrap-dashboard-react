import { combineReducers } from 'redux'

import postReducer from "./posts/reducers";

const rootReducers =combineReducers( {
    posts: postReducer,
});

export default rootReducers;