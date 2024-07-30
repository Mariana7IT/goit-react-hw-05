import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { BASE_POSTER_URL } from "/src/services/api.js";
import { fetchCastById } from "../services/api"; 

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await fetchCastById(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(`Error fetching cast: ${error.message}`);
      }
    };
    if (movieId) fetchCast();
  }, [movieId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.cast_id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : defaultImg
            }
            alt={actor.name}
          />
          <p>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;