import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";
import { registerReducer } from "./registerReducer";

const reducers = combineReducers({
  users: userReducer,
  categories: categoryReducer,
  register: registerReducer
});

export default reducers;
