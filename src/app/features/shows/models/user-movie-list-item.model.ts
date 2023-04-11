import { Movie } from './movie.model';

export interface UserMovieListItem {
  id: string;
  createdBy: string;
  items: Movie[];
  name: string;
  itemCount: number;
}
