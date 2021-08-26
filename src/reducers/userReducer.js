const user = {
  isLoggedIn: false,
  userID: {},
  email: {},
  profileData: {},
};

const userReducer = (userProfile = user, action) => {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return { ...userProfile, isLoggedIn: action.payload };
    case "USER_ID":
      return { ...userProfile, userID: action.payload };
    case "EMAIL":
      return { ...userProfile, email: action.payload };
    case "PROFILEDATA":
      return { ...userProfile, profileData: action.payload };
    default:
      return userProfile;
  }
};

export default userReducer;
