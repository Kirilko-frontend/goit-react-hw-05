import { useEffect, useRef, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchMovieById } from "../api/tmdb-api";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = useRef(location.state?.from || "/");

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Ошибка при получении информации о фильме:", error);
      }
    }

    loadMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => navigate(backLink.current)}
      >
        Go back
      </button>

      <div className={styles.movieInfo}>
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.title}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h4>Additional information</h4>
        <ul className={styles.links}>
          <li>
            <Link to="cast" state={{ from: backLink.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink.current }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
