import { MovieGenre } from './movie-genre.model';

export interface Movie {
  id: number;
  genreIds: MovieGenre;
  date: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  runtime: number;
  tagline: string;
}
