import { MovieModel } from './movie';

export interface MovieListModel {
  page: number;
  results: MovieModel[];
  dates?: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}
