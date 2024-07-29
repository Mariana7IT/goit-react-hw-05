import axios from "axios";

const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmZhRhNjIxYzBmNTYzYz3MmIyMG3MjkzYzUxMiIsIm5iZlI6MTcyMjI2NTAzOC4yOTAwOTgsInN1YiI6IjY2Y2YtdhYmIwMlMzI2MTkzMDg1MjExZmU4NiIsInNjb3BlcyI6WyJhcGlfcmVhZDpGQ.qZiDMPT5DL7MjI8NJIbfh1kJPXvkmw9Ji26kKGQ81U";

const BASE_URL = "https://api.themoviedb.org/3";
export const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w300"; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch trending movies: ${error.message}`);
  }
};

export default api;
