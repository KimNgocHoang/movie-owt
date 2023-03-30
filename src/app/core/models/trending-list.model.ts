
import { Trending } from './trending.model';

export interface TrendingList {
  page: number;
  results: Trending[];
  totalPages: number;
  totalResults: number;
}
