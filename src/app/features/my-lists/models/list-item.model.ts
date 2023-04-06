import { Show } from "../../shows/models/show.model";

export interface ListItem {
  id: string;
  createdBy: string;
  items: Show[];
  name: string;
  itemCount: number;
}
