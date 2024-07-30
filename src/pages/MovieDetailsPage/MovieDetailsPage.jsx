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
          src={
            movie.poster_path
              ? `${BASE_POSTER_URL}${movie.poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />
        <div className={s.detailsContainer}>
          <h2 className={s.detailsTitle}>{movie.original_title}</h2>
          <h3 className={s.detailsSubtitle}>Rating</h3>
          <p className={s.detailsInfo}>{movie.vote_average}</p>
          <h3 className={s.detailsSubtitle}>Overview</h3>
          <p className={s.detailsInfo}>{movie.overview}</p>
        </div>
      </div>
      <h2 className={s.infoTitle}>Additional information </h2>
      <ul className={s.linkList}>
        <li>
          <NavLink to={`cast`} className={linkClass}>
            Movie Cast
          </NavLink>
        </li>
        <li>
          <NavLink to={`reviews`} className={linkClass}>
            Movie Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};


export default MovieDetailsPage;

