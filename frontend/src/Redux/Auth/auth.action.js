import { API_BASE_URL } from "../../config/api";
import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./auth.actionType";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "./auth.actionType";
export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        console.log(loginData.data);
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, loginData.data);
        if (data.jwt){
            localStorage.setItem("jwt", data.jwt);
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