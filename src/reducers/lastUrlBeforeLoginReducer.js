const lastUrlBeforeLoginReducer = (query = "/", action) => {
  switch (action.type) {
    case "LAST_LOGIN_URL_QUERY":
      return action.payload;
    default:
      return query;
  }
};
export default lastUrlBeforeLoginReducer;
