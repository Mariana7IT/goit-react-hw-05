import  { useEffect, useState } from "react";
import { fetchTrendingMovies, fetchMovieById, fetchMovieCastById, fetchMovieReviewById, fetchMovieByQuery } from "/src/services/api.js";
import MovieList from "/src/components/MovieList/MovieList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (query) {
      const movies = await searchMovies(query);
      setMovies(movies);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
