import { combineReducers } from "redux";
import incrementReducer from "./errorReducer";
import searchResultReducer from "./searchResultReducer.js";
import statusReducer from "./statusReducer";
import urlQueryReducer from "./urlQueryReducer";

export default combineReducers({
  error: incrementReducer,
  searchResult: searchResultReducer,
  status: statusReducer,
  urlQuery: urlQueryReducer,
});
