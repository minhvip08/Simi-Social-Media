const initialState = {
  jwt: null,
  loading: false,
  error: null,
  user: null,
  searchUsers: []
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
    case "GET_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        

      };
    case "GET_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        jwt: action.payload,
        error: null

      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      case "GET_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null
      };
    
      // case "SEARCH_USER_REQUEST":
      // return {
      //   ...state,
      //   loading: true,
      //   error: null,
      // };
    case "SEARCH_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        searchUsers: action.payload
      };
    case "SEARCH_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        searchUsers: []
      };


      
      
    default:
      return state;
  }
};
