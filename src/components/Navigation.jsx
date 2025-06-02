import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
