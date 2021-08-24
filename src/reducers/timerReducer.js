const timerReducer = (timer = null, action) => {
  switch (action.type) {
    case "TIMER":
      return action.payload;
    default:
      return timer;
  }
};

export default timerReducer;
