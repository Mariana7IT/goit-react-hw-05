import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviewById } from "/src/services/api.js";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMovieReviewById(movieId); 
        setReviews(data); 
      } catch (error) {
        setError(`Error fetching reviews: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (movieId) fetchReviews();
  }, [movieId]);

  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  if (reviews.length === 0) return <div>No reviews found</div>;

  return (
    <ul className={s.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={s.reviewItem}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;