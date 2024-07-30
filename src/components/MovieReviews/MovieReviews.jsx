import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTrendingMovies } from "/src/services/api.js";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchReviewsById(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(`Error fetching reviews: ${error.message}`);
      }
    };
    if (movieId) fetchReviews();
  }, [movieId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (reviews.length === 0) {
    return <div>No reviews found</div>;
  }

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;