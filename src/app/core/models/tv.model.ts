import { Genre } from './genre.model';

export interface TvShow {
  id: number;
  date: string;
  originalTitle: string;
  originalName: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  runtime: number;
  tagline: string;
  genres?: Genre[];
}
