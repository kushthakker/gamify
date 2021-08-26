import axios from "axios";

const KEY = "AIzaSyB_n3PGWgJZyNGbkISnceJoAl_9q3VYTQA";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 4,
    key: KEY,
    type: "video",
  },
});
