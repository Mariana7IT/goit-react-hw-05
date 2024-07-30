import React, { useEffect, useState, useRef } from "react";
import {
  useParams,
  Link,
  Outlet,
  NavLink,
  useLocation,
} from "react-router-dom";
import { BASE_POSTER_URL, fetchMovieById } from "/src/services/api.js";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const backLinkHref = useRef(location.state || "/");

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const linkClass = ({ isActive }) => {
    return `${s.link} ${isActive ? s.active : ""}`;
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

  const { poster_path, original_title, vote_average, overview, genres } = movie;

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
          src={poster_path ? `${BASE_POSTER_URL}${poster_path}` : defaultImg}
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
        <NavLink className={linkClass} to={`/movies/${movieId}/cast`}>
          Cast
        </NavLink>
        <NavLink className={linkClass} to={`/movies/${movieId}/reviews`}>
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
