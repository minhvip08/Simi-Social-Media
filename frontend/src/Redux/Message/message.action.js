import { api } from "../../config/api";
import * as actionType from "./message.actionType";

export const createMessage = (message) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });

  try {
    const { data } = await api.post(`/api/chats/${message.chatId}/messages`, message);
    dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data });
    console.log("Create Message", data);
  } catch (error) {
    dispatch({
      type: actionType.CREATE_MESSAGE_FAILURE,
      payload: error,
    });
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_CHAT_REQUEST });

  try {
    const { data } = await api.post("/api/chats", chat);
    dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data });
    console.log("Create Chat", data);
  } catch (error) {
    dispatch({
      type: actionType.CREATE_CHAT_FAILURE,
      payload: error,
    });
  }
};

export const getAllChats = () => async (dispatch) => {
  dispatch({ type: actionType.GET_ALL_CHAT_REQUEST });

  try {
    const { data } = await api.get("/api/chats");
    dispatch({ type: actionType.GET_ALL_CHAT_SUCCESS, payload: data });
    console.log("Get All Chats", data);
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_CHAT_FAILURE,
      payload: error,
    });
  }
};
