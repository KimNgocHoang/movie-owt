import { Genre } from './genre.model';

export interface Season {
  id: number;
  name: string;
  posterPath: string;
}

export interface TvShow {
  id: number;
  firstAirDate: string;
  lastAirDate: string;
  status: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  overview: string;
  posterPath: string;
  backdropPath: string;
  name: string;
  voteAverage: number;
  episodeRunTime: number[];
  genres?: Genre[];
  seasons: Season[];
}
