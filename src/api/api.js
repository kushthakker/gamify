import axios from "axios";
const KEY = "3c5c85124bd043a2b31ab87793d2a31d";
// const KEY = process.env.GAME_API;

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: KEY,
  },
});
