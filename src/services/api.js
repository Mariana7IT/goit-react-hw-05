import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_KEY = "6ffe34a621c0f563c472b20c7293c512";

export const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w300";

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch trending movies: ${error.message}`);
  }
};

export const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(`movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch movie by ID: ${error.message}`);
  }
};

export const fetchMovieCastById = async (movieId) => {
  try {
    const response = await axios.get(
      `movie/${movieId}/credits?api_key=${API_KEY}`
    );
    return response.data.cast;
  } catch (error) {
    throw new Error(`Failed to fetch movie cast by ID: ${error.message}`);
  }
};

export const fetchMovieReviewById = async (movieId) => {
  try {
    const response = await axios.get(
      `movie/${movieId}/reviews?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch movie reviews by ID: ${error.message}`);
  }
};

export const fetchMovieByQuery = async (query) => {
  try {
    const response = await axios.get(
      `search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
    );
    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch movie by query: ${error.message}`);
  }
};


export default {
  fetchTrendingMovies,
  fetchMovieById,
  fetchMovieCastById,
  fetchMovieReviewById,
  fetchMovieByQuery,
};