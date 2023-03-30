export interface ShowList<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}
