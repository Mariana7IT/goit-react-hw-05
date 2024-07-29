import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { BASE_POSTER_URL } from "/src/services/api.js";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_READ_ACCESS_TOKEN}`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={s.cast}>
      {cast.map((actor) => (
        <div key={actor.cast_id} className={s.actor}>
          <img
            src={
              actor.profile_path
                ? `${BASE_POSTER_URL}${actor.profile_path}`
                : "https://via.placeholder.com/150"
            }
            alt={actor.name}
            className={s.actorImage}
          />
          <p>{actor.name}</p>
          <p>as {actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieCast;
