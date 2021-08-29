import _ from "lodash";
import produce from "immer";

const streamsReducer = (state = [], action) => {
  console.log("state", state);
  switch (action.type) {
    case "EDIT_USER":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case "ADD_TO_WISHLIST":
      return action.payload;
    case "REMOVE_FROM_WISHLIST":
      return action.payload;
    case "ADD_TO_COLLECTION":
      return action.payload;
    case "FETCH_USER":
      return action.payload;
    case "CREATE_USER":
      return {
        ...state,
        [action.payload.id]: { ...action.payload },
      };
    case "DELETE_USER":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default streamsReducer;
