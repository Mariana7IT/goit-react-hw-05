import axios from "axios";

const API_KEY = "6ffe34a621c0f563c472b20c7293c512";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmZmZTNhNjIxYzBmNTYzYzQ3MmIyMG...";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export default axiosInstance;
