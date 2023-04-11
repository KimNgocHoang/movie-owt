import { Component, OnInit } from '@angular/core';
import { SearchRequest } from '../../types/search-request.type';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { UserListsService } from '../../services/user-lists.service';
import { TranslateService } from '@ngx-translate/core';
import { Show } from '../../models/show.model';
import { UserMovieListItem } from '../../models/user-movie-list-item.model';
import { ParamsRequest } from '../../types/params-request.type';
import { FormControl } from '@angular/forms';
import { Movie } from '../../models/movie.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast.component';
import { MessageStatus } from '../../enum/message-status.enum';

@Component({
  selector: 'app-user-movie-list-details',
  templateUrl: './user-movie-list-details.component.html',
  styleUrls: ['./user-movie-list-details.component.scss'],
})
export class UserMovieListDetailsComponent implements OnInit {
  moviesAddedList: Movie[];
  movies: Show[];
  userMovieListItem: UserMovieListItem;
  listId: number;
  loading = true;
  loadingMoviesAddedList = true;
  totalResults: number;
  openModal = false;
  movieCtrl = new FormControl('');
  filteredMovies: Observable<Show[]>;
  movie: Movie;
  isSuggest = false;

  constructor(
    public translate: TranslateService,
    private userListsService: UserListsService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  private _filterStates(value: string): Show[] {
    const filterValue = value.toLowerCase();

    return this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = +params['id'];
      this.getUserListDetails({ listId: +params['id'] });
    });
    this.getMoviesBySearch({ query: '', page: 1 });
  }

  getMoviesBySearch(searchMoviesRes: SearchRequest) {
    this.loading = true;
    this.movieService
      .getPopularMoviesBySearch(searchMoviesRes)
      .subscribe((res) => {
        this.movies = res.results;
        this.loading = false;
        this.filteredMovies = this.movieCtrl.valueChanges.pipe(
          debounceTime(1000),
          startWith(''),
          map((movie) =>
            movie ? this._filterStates(movie) : this.movies.slice()
          )
        );
      });
  }

  getMovie(id: number) {
    this.movieService.getMovieById(id).subscribe((res) => {
      this.movie = res;
    });
    return this.movie;
  }

  addItem(paramsRequest: ParamsRequest) {
    this.movie = this.getMovie(paramsRequest.mediaId);
    this.isSuggest = this.checkItem(paramsRequest);
    this.isSuggest
      ? this._snackBar.openFromComponent(ToastComponent, {
          duration: 2000,
          data: MessageStatus.ERROR,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        })
      : this.userListsService
          .addMovieToList(paramsRequest)
          .subscribe((response) => {
            if (response.status_code === 12) {
              this.openModal = true;
              this.moviesAddedList = [this.movie, ...this.moviesAddedList];
            }
          });
  }

  getUserListDetails(paramsRequest: ParamsRequest) {
    this.loadingMoviesAddedList = true;
    this.userListsService.getUserListDetails(paramsRequest).subscribe((res) => {
      this.moviesAddedList = res.items;
      this.totalResults = res.itemCount;
      this.userMovieListItem = res;
      this.loadingMoviesAddedList = false;
    });
  }

  checkItem(paramsRequest: ParamsRequest) {
    this.userListsService
      .checkItemStatus(paramsRequest)
      .subscribe((response) => {
        this.isSuggest = response.item_present;
      });
    return this.isSuggest;
  }

  onIsSuggestChange(value: boolean) {
    this.openModal = value;
  }

  closeModal() {
    this.openModal = false;
  }

  onBackList() {
    this.router.navigate(['/shows/my-lists']);
  }
}
