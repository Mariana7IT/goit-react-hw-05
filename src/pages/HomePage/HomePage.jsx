import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "/src/components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "/src/services/api.js";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <>
      <h1 className={s.title}>Trending movies today</h1>
      {isLoading && <div>Trending movies is loading...</div>}
      {error && <div>Oops! Something went wrong: {error}</div>}
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;