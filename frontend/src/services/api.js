import axios from "axios";

const API = axios.create({
  baseURL: "https://global-trend-task.onrender.com/api",
  withCredentials: true,
});

export default API;
