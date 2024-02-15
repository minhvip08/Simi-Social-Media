const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null,
    comments: [],
    newComment: null,
};
export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_POST_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "CREATE_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                post: action.payload,
                posts: [...state.posts, action.payload],
                error: null,
            };
        case "CREATE_POST_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,

            };
        case "GET_ALL_POST_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "GET_ALL_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: null,
                comments: action.payload.comments,
            };
        case "GET_ALL_POST_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                
            };
        case "GET_USER_POST_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "GET_USER_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: null,
            };
        case "GET_USER_POST_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "LIKE_POST_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "LIKE_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                like: action.payload,
                posts: state.posts.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
                error: null,
            };
        case "LIKE_POST_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "CREATE_COMMENT_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "CREATE_COMMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                // comments: [...state.comments, action.payload],
                error: null,
                newComment: action.payload,
            };
        case "CREATE_COMMENT_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}