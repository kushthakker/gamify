import axios from "axios";
const KEY = "AIzaSyAsRjPfiG75tEnJytM3s36609CpxpTbWHg";
// const KEY = process.env.YT_API;
export default axios.create({
  baseURL:
    "https://secret-sierra-81136.herokuapp.com/https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 4,
    key: KEY,
    type: "video",
  },
});
