import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";

const reducers = combineReducers({
  users: userReducer,
  categories: categoryReducer,
});

export default reducers;
