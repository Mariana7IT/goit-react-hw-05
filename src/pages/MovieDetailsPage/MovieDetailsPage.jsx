import React, { useEffect, useState, useRef } from "react";
import {
  useParams,
  Link,
  NavLink,
  useLocation,
  Outlet,
} from "react-router-dom";
import { BASE_POSTER_URL, fetchMovieById } from "/src/services/api.js";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/");

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const movieById = await fetchMovieById(movieId);
        setMovie(movieById);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById();
  }, [movieId]);

  if (isLoading) {
    return <div>Movie details are loading...</div>;
  }

  if (error) {
    return <div>Oops! Something went wrong</div>;
  }

  if (!movie) {
    return <div>No movie details found</div>;
  }

  return (
    <>
      <h1 className={s.title}>Movie Details</h1>
      <Link className={s.goBack} to={backLinkRef.current}>
        Go back
      </Link>
      <div className={s.content}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.original_title}
          height={480}
        />
        <div className={s.info}>
          <h2>{movie.original_title}</h2>
          <p>User score: {(movie.vote_average * 10).toFixed(0)}%</p>
          <ul>
            <li>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.btn}>
        <NavLink className={s.link} to={`/movies/${movieId}/cast`}>
          Cast
        </NavLink>
        <NavLink className={s.link} to={`/movies/${movieId}/reviews`}>
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;