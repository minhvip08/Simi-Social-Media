import { API_BASE_URL, api } from "../../config/api";
import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, GET_PROFILE_SUCCESS, GET_PROFILE_REQUEST, GET_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from "./auth.actionType";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "./auth.actionType";
import { SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE } from "./auth.actionType";
export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        console.log(loginData.data);
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, loginData.data);
        if (data.token){
            localStorage.setItem("jwt", data.token);
        }
        console.log("login: ", data);
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    }
    catch (error) {
        console.log("error", error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};

export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        console.log(registerData.data);
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data);
        console.log("register: ", data);
        dispatch({ type: REGISTER_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("error", error);
        dispatch({ type: REGISTER_FAILURE, payload: error });
    }
}

export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, 
        {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        });
        console.log("profile: ", data);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("error", error);
        dispatch({ type: GET_PROFILE_FAILURE, payload: error });
    }
}

export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type:  UPDATE_PROFILE_REQUEST});
    try {
        const { data } = await api.put(`/api/users`, 
        
            reqData
        );
        console.log("profile: ", data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("error", error);
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
    }
}

export const searchUserAction  = (searchData) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_REQUEST });
    try {
        const { data } = await api.get(`/api/users/search?query=${searchData}`);
        console.log("search: ", data);
        dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("error", error);
        dispatch({ type: SEARCH_USER_FAILURE, payload: error });
    }
}