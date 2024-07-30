import axios from "axios";

const API_KEY = "6ffe34a621c0f563c472b20c7293c512";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w500";



export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch trending movies: ${error.message}`);
  }
};

export const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch movie by ID: ${error.message}`);
  }
};

export const fetchMovieCastById = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    return response.data.cast;
  } catch (error) {
    throw new Error(`Failed to fetch movie cast: ${error.message}`);
  }
};

export const fetchMovieReviewById = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch movie reviews by ID: ${error.message}`);
  }
};

export const fetchMovieByQuery = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
    );
    return response.data.results;
  } catch (error) {
    throw new Error(`Failed to fetch movie by query: ${error.message}`);
  }
};

export { API_KEY, BASE_URL, BASE_POSTER_URL };
