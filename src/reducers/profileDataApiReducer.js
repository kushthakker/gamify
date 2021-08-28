import _ from "lodash";

const streamsReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_USER":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        [action.payload.wishlist]: [...action.payload.wishlist, action.payload],
      };
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
