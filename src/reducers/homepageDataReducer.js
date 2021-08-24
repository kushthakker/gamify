const value = {
  carousel: {},
  comingSoon: {},
  featured: {},
  publishers: {
    microsoft: {},
    sony: {},
    nintendo: {},
  },
};

const homepageDataReducer = (homepageData = value, action) => {
  switch (action.type) {
    case "HOMEPAGE_DATA_CAROUSEL":
      return { ...homepageData, carousel: action.payload[0] };
    case "HOMEPAGE_DATA_COMINGSOON":
      return { ...homepageData, comingSoon: action.payload };
    case "HOMEPAGE_DATA_FEATURED":
      return { ...homepageData, featured: action.payload };
    case "HOMEPAGE_DATA_PUBLISHER_MICROSOFT":
      return {
        ...homepageData,
        publishers: { ...homepageData.publishers, microsoft: action.payload },
      };
    case "HOMEPAGE_DATA_PUBLISHER_SONY":
      return {
        ...homepageData,
        publishers: { ...homepageData.publishers, sony: action.payload },
      };
    case "HOMEPAGE_DATA_PUBLISHER_NINTENDO":
      return {
        ...homepageData,
        publishers: { ...homepageData.publishers, nintendo: action.payload },
      };
    default:
      return homepageData;
  }
};

export default homepageDataReducer;
