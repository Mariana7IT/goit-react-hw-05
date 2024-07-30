import React from 'react'

import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { BASE_POSTER_URL } from "/src/services/api.js";
import { fetchMovieById } from "/src/services/api.js";
import s from "./MovieDetailsPage.module.css";


const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const backLinkHref = useRef(location.state || "/");

  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  const linkClass = ({ isActive }) => {
    return s (s.link, isActive && s.active);
  };

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setIsLoading(true);
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

  if (!movie) {
    return <div>No movie details found</div>;
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
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;

