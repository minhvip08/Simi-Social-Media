import * as actionTypes from './message.actionType';
const initialState = {
    messages: [],
    chats: [],
    loading: false,
    error: null,
    message: null,
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CREATE_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.CREATE_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
                error: null,
            }
        case actionTypes.CREATE_MESSAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case actionTypes.CREATE_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.CREATE_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: [...state.chats, action.payload],
                error: null,
            }
        case actionTypes.CREATE_CHAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case actionTypes.GET_ALL_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.GET_ALL_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload,
                error: null,
            }
        case actionTypes.GET_ALL_CHAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}