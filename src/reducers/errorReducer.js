const incrementReducer = (value = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return value + 1;
    default:
      return value;
  }
};

export default incrementReducer;
