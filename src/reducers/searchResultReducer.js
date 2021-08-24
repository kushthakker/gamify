const searchResultReducer = (searchResult = [], action) => {
  switch (action.type) {
    case "SEARCH_VALUE":
      return [...action.payload];
    default:
      return searchResult;
  }
};

export default searchResultReducer;
