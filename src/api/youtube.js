import axios from "axios";
const KEY = "AIzaSyDLDA8jUkBKC27KYK9_PWcgpVgRWK8sf0o";
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
