import { Movie } from './movie';

export interface MovieList {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}
