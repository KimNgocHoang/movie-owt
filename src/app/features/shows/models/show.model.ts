import { ShowMediaType } from "../show-media-type.enum";

export interface Show {
  id: number;
  title?: string;
  name?: string;
  posterPath: string;
  voteAverage: number;
  mediaType: ShowMediaType;
}
