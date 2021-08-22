export const error = () => {
  return {
    type: "INCREMENT",
  };
};

export const searchValue = (value) => {
  return {
    type: "SEARCH_VALUE",
    payload: value,
  };
};

export const status = (value) => {
  return {
    type: "STATUS",
    payload: value,
  };
};

export const urlQuery = (value) => {
  return {
    type: "URL_QUERY",
    payload: value,
  };
};
