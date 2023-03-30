import { Movie } from './movie.model';

export interface MovieList {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}
