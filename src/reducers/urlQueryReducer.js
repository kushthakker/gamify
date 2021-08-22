const urlQueryReducer = (query = "", action) => {
  switch (action.type) {
    case "URL_QUERY":
      return action.load;
    default:
      return query;
  }
};
export default urlQueryReducer;
