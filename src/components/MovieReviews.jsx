import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./MovieReviews.module.css";
import { fetchMovieReviews } from "../api/tmdb-api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.log("Ошибка", error);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [movieId]);

  if (loading) return <p className={styles.message}>Loading...</p>;

  if (reviews.length === 0) {
    return (
      <p className={styles.message}>
        We don't have any reviews for this movie.
      </p>
    );
  }

  return (
    <ul className={styles.reviewList}>
      {reviews.map((rev) => (
        <li key={rev.id} className={styles.reviewItem}>
          <p className={styles.author}>
            <strong>Author:</strong> {rev.author}
          </p>
          <p className={styles.content}>{rev.content}</p>
        </li>
      ))}
    </ul>
  );
}
