import { ActionTypes } from "../types/action-types";

const initialState = {
  selectedSubCategory: {},
  selectedCategory: {},
  info: {},
  account: {},
};

export const registerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SUB_CATEGORY:
      return { ...state, selectedSubCategory: payload };
    case ActionTypes.SET_CATEGORY:
      return { ...state, selectedCategory: payload };
    case ActionTypes.SET_INFO_FIELDS:
      return { ...state, info: payload };
    case ActionTypes.SET_ACCOUNT_FIELDS:
      return { ...state, account: payload };
    default:
      return state;
  }
};
