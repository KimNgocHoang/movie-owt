import { Movie } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  genres: string;
  loading = true;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.movie = this.getMovie(+params['id']);
    });
  }

  getMovie(id: number) {
    this.loading = true;
    this.movieService.getMovieById(id).subscribe((res) => {
      this.movie = res;
      this.genres = res.genres.map((genre) => genre.name).join(', ');
      this.loading = false;
    });
    return this.movie;
  }
}
