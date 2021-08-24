const statusReducer = (status = "idle", action) => {
  switch (action.type) {
    case "STATUS":
      return action.payload;
    default:
      return status;
  }
};

export default statusReducer;
