import { useEffect, useState } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import { fetchMoviesByQuery } from "../api/tmdb-api";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const location = useLocation();

  useEffect(() => {
    if (!query) return;

    async function loadSearchedMovies() {
      try {
        const data = await fetchMoviesByQuery(query);
        setMovies(data);
      } catch (error) {
        console.error("Ошибка при получении фильмов:", error);
      }
    }

    loadSearchedMovies();
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.search.value.trim();
    setSearchParams({ query: searchValue });
    setQuery(searchValue);
    form.reset();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="search"
          placeholder="Search movies"
          defaultValue={query}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={styles.movieLink}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
