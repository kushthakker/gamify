import { combineReducers } from "redux";
import incrementReducer from "./errorReducer";
import searchResultReducer from "./searchResultReducer.js";
import statusReducer from "./statusReducer";

export default combineReducers({
  error: incrementReducer,
  searchResult: searchResultReducer,
  status: statusReducer,
});
