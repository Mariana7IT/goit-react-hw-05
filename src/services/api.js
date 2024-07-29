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

export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};