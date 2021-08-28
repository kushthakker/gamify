const user = {
  isLoggedIn: {},
  userID: {},
  email: {},
};

const userReducer = (userProfile = user, action) => {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return { ...userProfile, isLoggedIn: action.payload };
    case "USER_ID":
      return { ...userProfile, userID: action.payload };
    case "EMAIL":
      return { ...userProfile, email: action.payload };
    default:
      return userProfile;
  }
};

export default userReducer;
