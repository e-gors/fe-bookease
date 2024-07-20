import { ActionTypes } from "../types/action-types";

const initialState = {
  user: {},
  users: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return { ...state, user: payload };
    case ActionTypes.SET_USERS:
      return { ...state, users: payload };
    case ActionTypes.UPDATE_USER:
      return { ...state, user: payload };
    case ActionTypes.REMOVE_USER:
      return Object.keys(state.user).map((item) => item.id !== payload);
    default:
      return state;
  }
};
