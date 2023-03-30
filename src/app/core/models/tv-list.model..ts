import { TvShow } from './tv.model';

export interface TvShowList {
  page: number;
  results: TvShow[];
  totalPages: number;
  totalResults: number;
}
