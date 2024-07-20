import { ActionTypes } from "../types/action-types";

export const setCategories = (categories) => {
  return {
    type: ActionTypes.SET_CATEGORIES,
    payload: categories,
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
