import { Movie } from './../../../../core/models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../../movie.service';
import { MovieGenre } from 'src/app/core/models/movie-genre.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  genres: MovieGenre[];
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
      // this.genres = res.genres;
      this.loading = false;
      console.log(this.movie.genres);

    });
    return this.movie;
  }
}
