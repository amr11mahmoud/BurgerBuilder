import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-7940b.firebaseio.com/",
});

export default instance;
