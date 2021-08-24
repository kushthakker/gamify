import { combineReducers } from "redux";
import incrementReducer from "./errorReducer";
import searchResultReducer from "./searchResultReducer.js";
import statusReducer from "./statusReducer";
import urlQueryReducer from "./urlQueryReducer";
import homepageDataReducer from "./homepageDataReducer";
import timerReducer from "./timerReducer";

export default combineReducers({
  error: incrementReducer,
  searchResult: searchResultReducer,
  status: statusReducer,
  urlQuery: urlQueryReducer,
  homepageData: homepageDataReducer,
  timer: timerReducer,
});
