import users from "../api/users";

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

export const lastLoginUrlQuery = (value) => {
  return {
    type: "LAST_LOGIN_URL_QUERY",
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

export const homepageData_publisher_microsoft = (value) => {
  return {
    type: "HOMEPAGE_DATA_PUBLISHER_MICROSOFT",
    payload: value,
  };
};
export const homepageData_publisher_sony = (value) => {
  return {
    type: "HOMEPAGE_DATA_PUBLISHER_SONY",
    payload: value,
  };
};
export const homepageData_publisher_nintendo = (value) => {
  return {
    type: "HOMEPAGE_DATA_PUBLISHER_NINTENDO",
    payload: value,
  };
};

export const timer = (value) => {
  return {
    type: "TIMER",
    payload: value,
  };
};
export const isLoggedIn = (value) => {
  return {
    type: "IS_LOGGED_IN",
    payload: value,
  };
};
export const userId = (value) => {
  return {
    type: "USER_ID",
    payload: value,
  };
};
export const email = (value) => {
  return {
    type: "EMAIL",
    payload: value,
  };
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await users.get(`/users/${id}`);
  console.log(response);

  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
};

export const addUser = (values) => async (dispatch, getState) => {
  const { userId } = getState().user.userID;
  const response = await users.post("/users", { ...values, userId });
  console.log(`response`, response);
  dispatch({
    type: "CREATE_USER",
    payload: { ...response.data, id: userId },
  });
};

export const addToWishlist = (id, values) => async (dispatch) => {
  const response = await users.patch(`/users/${id}/`, values);

  dispatch({
    type: "ADD_TO_WISHLIST",
    payload: response.data,
  });
};

//remove from wishlist
export const removeFromWishlist = (id, values) => async (dispatch) => {
  const response = await users.patch(`/users/${id}/`, values);

  dispatch({
    type: "REMOVE_FROM_WISHLIST",
    payload: response.data,
  });
};

export const addToCollection = (id, values) => async (dispatch) => {
  const response = await users.patch(`/users/${id}/`, values);

  dispatch({
    type: "ADD_TO_COLLECTION",
    payload: response.data,
  });
};

//remove from wishlist
export const removeFromCollection = (id, values) => async (dispatch) => {
  const response = await users.patch(`/users/${id}/`, values);

  dispatch({
    type: "REMOVE_FROM_COLLECTION",
    payload: response.data,
  });
};
export const addToMygames = (id, values) => async (dispatch) => {
  const response = await users.patch(`/users/${id}/`, values);

  dispatch({
    type: "ADD_TO_MYGAMES",
    payload: response.data,
  });
};

//remove from wishlist
export const removeFromMygames = (id, values) => async (dispatch) => {
  const response = await users.patch(`/users/${id}/`, values);

  dispatch({
    type: "REMOVE_FROM_MYGAMES",
    payload: response.data,
  });
};

export const editUser = (id, values) => async (dispatch) => {
  const response = await users.patch(`/users/${id}`, values);
  dispatch({
    type: "EDIT_USER",
    payload: response.data,
  });
};

export const deleteUser = (id) => async (dispatch) => {
  await users.delete(`/users/${id}`);
  dispatch({
    type: "DELETE_USER",
    payload: id,
  });
};
