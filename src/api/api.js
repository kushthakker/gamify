import axios from "axios";
const KEY = "9add24d57d554279baa4f2046c96bf99";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: KEY,
  },
});
