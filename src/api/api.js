import axios from "axios";

// const KEY = process.env.GAME_API;

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: process.env.GAME_API,
  },
});
