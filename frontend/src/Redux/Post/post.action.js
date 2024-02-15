import {api} from '../../config/api';

export const createPostAction = (post) => async (dispatch) => {
    dispatch({ type: "CREATE_POST_REQUEST", payload: post });
    try {
        const {data} = await api.post('/api/posts', post);
        dispatch({ type: "CREATE_POST_SUCCESS", payload: data });
        console.log("Post created successfully", data);
    } catch (error) {
        dispatch({ type: "CREATE_POST_FAILURE", payload: error.message });
    }

}

export const getAllPostAction = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_POST_REQUEST" });
    try {
        const {data} = await api.get('/api/posts');
        dispatch({ type: "GET_ALL_POST_SUCCESS", payload: data });
        console.log("All posts", data);
    } catch (error) {
        dispatch({ type: "GET_ALL_POST_FAILURE", payload: error.message });
    }
}

export const getUsersPostAction = (id) => async (dispatch) => {
    dispatch({ type: "GET_USER_POST_REQUEST" });
    try {
        const {data} = await api.get(`/api/posts/user/${id}`);
        dispatch({ type: "GET_USER_POST_SUCCESS", payload: data });
        console.log("User posts", data);
    } catch (error) {
        dispatch({ type: "GET_USER_POST_FAILURE", payload: error.message });
    }
}

export const likePostAction = (postId) => async (dispatch) => {
    dispatch({ type: "LIKE_POST_REQUEST" });
    try {
        const {data} = await api.put(`/api/posts/like/${postId}`);
        dispatch({ type: "LIKE_POST_SUCCESS", payload: data });
        console.log("Post liked", data);
    } catch (error) {
        dispatch({ type: "LIKE_POST_FAILURE", payload: error.message });
    }
}

export const createCommentAction = (reqData) => async (dispatch) => {
    dispatch({ type: "CREATE_COMMENT_REQUEST" });
    try {
        const {data} = await api.post(`/api/posts/${reqData.postId}/comments`, reqData.data);
        dispatch({ type: "CREATE_COMMENT_SUCCESS", payload: data });
        console.log("Comment created", data);
    } catch (error) {
        dispatch({ type: "CREATE_COMMENT_FAILURE", payload: error.message });
    }
}