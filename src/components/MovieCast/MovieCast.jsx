import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_POSTER_URL } from "/src/services/api.js";
import { fetchMovieCastById } from "/src/services/api.js"; 
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCastById = async () => {
      try {
        const castData = await fetchMovieCastById(movieId);
        setCast(castData);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getCastById();
  }, [movieId]);

  if (isLoading) return <div>Loading cast...</div>;
  if (error) return <div>{error}</div>;

  if (cast.length === 0) return <div>No cast information available</div>;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;