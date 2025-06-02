import axios from "axios";

const API_KEY = "9cda16d98a6e510af2decf0d66e8e7d5";
const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const fetchTrendingMovies = async () => {
  const res = await instance.get("/trending/movie/day");
  return res.data.results;
};

export const fetchMovieById = async (movieId) => {
  const res = await instance.get(`/movie/${movieId}`);
  return res.data;
};

export const fetchMovieCast = async (movieId) => {
  const res = await instance.get(`/movie/${movieId}/credits`);
  return res.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const res = await instance.get(`/movie/${movieId}/reviews`);
  return res.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const res = await instance.get("/search/movie", {
    params: {
      query,
    },
  });
  return res.data.results;
};
