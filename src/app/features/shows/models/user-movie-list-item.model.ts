import { Show } from '../../shows/models/show.model';

export interface UserMovieListItem {
  id: string;
  createdBy: string;
  items: Show[];
  name: string;
  itemCount: number;
}
