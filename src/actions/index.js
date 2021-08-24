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
export const homepageData_carousel = (value) => {
  return {
    type: "HOMEPAGE_DATA_CAROUSEL",
    payload: [value],
  };
};
export const homepageData_comingsoon = (value) => {
  return {
    type: "HOMEPAGE_DATA_COMINGSOON",
    payload: value,
  };
};
export const homepageData_featured = (value) => {
  return {
    type: "HOMEPAGE_DATA_FEATURED",
    payload: value,
  };
};
