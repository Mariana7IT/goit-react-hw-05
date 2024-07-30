import { useEffect, useState } from "react";
import axios from "axios";
import { fetchTrendingMovies, fetchMovieById, fetchMovieCastById, fetchMovieReviewById, fetchMovieByQuery } from "/src/services/api.js";
import MovieList from "/src/components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmZlMzRhNjIxYzBmNTYzYzQ3MmIyMGM3MjkzYzUxMiIsIm5iZiI6MTcyMjI2NTAzOC4yOTAwOTgsInN1YiI6IjY2YTdhYmIwM2I2MTkzMDg1MjExZmU4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qZiDMPT5DL7MjI8NJIbfih1kJPXvkmw9Ji26KkGQ81U`,
        },
      }
    );
    setMovies(response.data.results);
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