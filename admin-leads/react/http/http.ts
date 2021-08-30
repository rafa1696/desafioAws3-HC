import axios from "../node_modules/axios/index";

export default axios.create({
  baseURL: "https://marcosdesafio--hiringcoders202108.myvtex.com/_v/",
  headers: {
    "Content-type": "application/json"
  }
});
