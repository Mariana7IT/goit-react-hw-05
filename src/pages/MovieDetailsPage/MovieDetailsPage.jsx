import React from 'react'

import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import axios from "axios";
import s from "./MovieDetailsPage.module.css";
import { BASE_POSTER_URL } from "/src/services/api.js";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_READ_ACCESS_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className={s.movieDetails}>
      <img
        src={
          movie.poster_path
            ? `${BASE_POSTER_URL}${movie.poster_path}`
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.title}
        className={s.poster}
      />
      <div className={s.info}>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>Release date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
      <div className={s.additional}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

