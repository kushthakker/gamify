const value = {
  carousel: {},
  comingSoon: {},
  featured: {},
};

const homepageDataReducer = (homepageData = value, action) => {
  switch (action.type) {
    case "HOMEPAGE_DATA_CAROUSEL":
      return { ...homepageData, carousel: action.payload[0] };
    case "HOMEPAGE_DATA_COMINGSOON":
      return { ...homepageData, comingSoon: action.payload };
    case "HOMEPAGE_DATA_FEATURED":
      return { ...homepageData, featured: action.payload };
    default:
      return homepageData;
  }
};

export default homepageDataReducer;
