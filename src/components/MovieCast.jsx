import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./MovieCast.module.css";
import { fetchMovieCast } from "../api/tmdb-api";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function loadCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.log("Ошибка", error);
      }
    }

    loadCast();
  }, [movieId]);

  if (cast.length === 0) {
    return <p className={styles.message}>No cast information available.</p>;
  }

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/100x150?text=No+Photo"
            }
            alt={actor.name}
            className={styles.actorImage}
          />
          <div>
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.character}>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
