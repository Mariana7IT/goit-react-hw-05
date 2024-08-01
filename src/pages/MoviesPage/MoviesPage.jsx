import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { fetchMovieByQuery } from "/src/services/api.js";
import MovieList from "/src/components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const movies = await fetchMovieByQuery(query);
          setMovies(movies);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
        }
      };

      fetchMovies();
    }
  }, [query]);

  const handleSearch = () => {
    setSearchParams({ query });
  };

  return (
    <div>
      <h1 className={s.title}>Search Movies</h1>
      <div className={s.wrapper}>
        <input
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
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