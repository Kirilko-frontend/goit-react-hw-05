import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { fetchTrendingMovies } from "../api/tmdb-api";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.log("Ошибка при загрузке фильмов:", error);
      }
    }

    loadTrending();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
