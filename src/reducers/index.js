import { combineReducers } from "redux";
import incrementReducer from "./errorReducer";

export default combineReducers({
  error: incrementReducer,
});
