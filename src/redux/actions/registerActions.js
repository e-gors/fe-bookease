import { ActionTypes } from "../types/action-types";

export const setInfo = (fields) => {
  return {
    type: ActionTypes.SET_INFO_FIELDS,
    payload: fields,
  };
};

export const setAccount = (fields) => {
    return {
      type: ActionTypes.SET_ACCOUNT_FIELDS,
      payload: fields,
    };
  };

export const setCategory = (category) => {
  return {
    type: ActionTypes.SET_CATEGORY,
    payload: category,
  };
};

export const setSubCategory = (subCategory) => {
  return {
    type: ActionTypes.SET_SUB_CATEGORY,
    payload: subCategory,
  };
};
