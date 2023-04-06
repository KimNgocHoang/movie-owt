import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: Movie;
  genres: string;
  loading = true;
  getMovieByApiSub: Subscription;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMovieByApiSub = this.route.params.subscribe((params: Params) => {
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

  ngOnDestroy(): void {
    this.getMovieByApiSub.unsubscribe();
  }
}
