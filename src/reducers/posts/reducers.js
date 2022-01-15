import * as actionType from './action.js';



const postReducer = (state = [], action) => {
    switch (action.type) {
        case actionType.ADD_POST:
            return [
                {
                    id: (state.length === 0) ? 0 : state[0].id + 1,
                    title: action.title,
                    content: action.content,
                    editing: false
                },
                ...state
            ];

        case actionType.DELETE_POST:
            return state.filter((post) => post.id !== action.id);

        case actionType.EDIT_POST:
            return state.map((post) => post.id === action.id
                ? { ...post, editing: !post.editing }
                : post);

        case actionType.UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        title: action.newTitle,
                        content: action.newContent,
                        editing: !post.editing
                    }
                } else {
                    return post;
                }
            });
            
        default: 
            return state;
    }
}

export default postReducer;