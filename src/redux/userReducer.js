import {
  SET_USERS,
  SET_USER,
  DELETE_USER,
  ADD_USER,
  SET_LAST_USER,
  LOADING_DATA
} from "./types";

const initialState = {
  users: [],
  lastUser: {},
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload }
      };
    case SET_LAST_USER:
      return {
        ...state,
        lastUser: { ...action.payload }
      };
    case DELETE_USER:
      let index = state.users.findIndex(user => user.id === action.payload);
      state.users.splice(index, 1);
      return {
        ...state
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    default:
      return state;
  }
}
