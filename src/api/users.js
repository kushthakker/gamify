import axios from "axios";
// const KEY = process.env.GAME_API;

export default axios.create({
  baseURL:
    "https://secret-sierra-81136.herokuapp.com/https://gamify-server.herokuapp.com/",
});
