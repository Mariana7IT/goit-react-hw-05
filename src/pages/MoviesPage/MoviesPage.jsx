import { useState } from "react";
import axios from "axios";
import { fetchMovieByQuery } from "/src/services/api.js";
import MovieList from "/src/components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const movies = await fetchMovieByQuery(query);
      setMovies(movies);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  return (
    <div>
      <h1 className={s.title}>Search Movies</h1>
      <div className={s.wrapper}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={s.form}
          placeholder="Type film's name..."
        />
        <button onClick={handleSearch} className={s.btn}>
          Search
        </button>
      </div>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;