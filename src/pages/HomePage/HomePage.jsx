import React from "react";
import axios from "axios";
import MovieList from "/src/components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "/src/services/api.js";


const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const movies = await fetchTrendingMovies();
      setMovies(movies);
    };
    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;




