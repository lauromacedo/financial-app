import axios from "axios";

export default axios.create({
  baseURL: 'https://financial-app-j6na.onrender.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});