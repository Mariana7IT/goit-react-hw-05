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
    <>
      <h1 className={s.title}> Movie Details </h1>
      {isLoading && <div>Movie details is loading...</div>}
      {error && <div>Oops! Something went wrong</div>}
      <Link className={s.goBack} to={backLinkHref.current}>
        Go back
      </Link>
      <div className={s.content}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={original_title}
          height={480}
        />
        <div className={s.info}>
          <h2>{original_title}</h2>
          <p>User score: {(vote_average * 10).toFixed(0)}%</p>
          <ul>
            <li>
              <h3>Overview</h3>
              <p>{overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <ul>
                {genres.map((e) => (
                  <li key={e.id}>{e.name}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.btn}>
        <NavLink className={buildLinkClass} to={`/movies/${movieID}/cast`}>
          Cast
        </NavLink>

        <NavLink to={`/movies/${movieID}/reviews`} className={buildLinkClass}>
          Rewiews
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;

