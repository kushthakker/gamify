import { combineReducers } from "redux";
import searchResultReducer from "./searchResultReducer.js";
import statusReducer from "./statusReducer";
import urlQueryReducer from "./urlQueryReducer";
import homepageDataReducer from "./homepageDataReducer";
import timerReducer from "./timerReducer";
import userReducer from "./userReducer";
import profileDataApiReducer from "./profileDataApiReducer";

export default combineReducers({
  searchResult: searchResultReducer,
  status: statusReducer,
  urlQuery: urlQueryReducer,
  homepageData: homepageDataReducer,
  timer: timerReducer,
  user: userReducer,
  profileDataApi: profileDataApiReducer,
});
