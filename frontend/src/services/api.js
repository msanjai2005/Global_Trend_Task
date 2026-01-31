import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // 🔑 THIS IS THE CORE CHANGE
});

export default API;
