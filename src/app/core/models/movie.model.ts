import { Genre } from './genre.model';

export interface Movie {
  id: number;
  date: string;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  runtime: number;
  tagline: string;
  genres?: Genre[];
}
