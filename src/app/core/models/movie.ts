import { MovieGenerModel } from './movie-genre.model';

export interface MovieModel {
  id: number;
  category: MovieGenerModel;
  date: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
}
