import { Component, OnInit } from '@angular/core';
import { SearchRequest } from '../../types/search-request.type';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { UserListsService } from '../../services/user-lists.service';
import { TranslateService } from '@ngx-translate/core';
import { Show } from '../../models/show.model';
import { UserMovieListItem } from '../../models/user-movie-list-item.model';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast.component';
import { MessageStatus } from '../../enum/message-status.enum';
import { ListRequest } from '../../types/list-request.type';

@Component({
  selector: 'app-user-movie-list-details',
  templateUrl: './user-movie-list-details.component.html',
  styleUrls: ['./user-movie-list-details.component.scss'],
})
export class UserMovieListDetailsComponent implements OnInit {
  moviesAddedList: Show[];
  movies: Show[];
  userMovieListItem: UserMovieListItem;
  listId: number;
  loading = true;
  loadingMoviesAddedList = true;
  totalResults: number;
  openModal = false;
  movieCtrl = new FormControl('');
  filteredMovies: Observable<Show[]>;

  constructor(
    public translate: TranslateService,
    private userListsService: UserListsService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = +params['id'];
      this.getUserListDetails({ listId: +params['id'] });
    });
    this.getMoviesBySearch({ query: '', page: 1 });
    this.filteredMovies = this.movieCtrl.valueChanges.pipe(
      debounceTime(1000),
      startWith(''),
      map((query) =>
        query
          ? this.getMoviesBySearch({
              query,
              page: 1,
            })
          : this.movies.slice()
      )
    );
  }

  getMoviesBySearch(searchMoviesRes: SearchRequest) {
    this.loading = true;
    this.movieService
      .getPopularMoviesBySearch(searchMoviesRes)
      .subscribe((res) => {
        this.movies = res.results;
        this.loading = false;
      });
    return this.movies;
  }

  addItem(movie: Show) {
    const listRequest: ListRequest = { mediaId: movie.id, listId: this.listId };
    this.userListsService.checkItemStatus(listRequest).subscribe((response) => {
      response.item_present
        ? this._snackBar.openFromComponent(ToastComponent, {
            duration: 2000,
            data: MessageStatus.ERROR,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          })
        : this.userListsService
            .addMovieToList(listRequest)
            .subscribe((response) => {
              if (response.success) {
                this.openModal = true;
                this.moviesAddedList = [movie, ...this.moviesAddedList];
              }
            });
    });
  }

  getUserListDetails(listIdRequest: ListRequest) {
    this.loadingMoviesAddedList = true;
    this.userListsService.getUserListDetails(listIdRequest).subscribe((res) => {
      this.moviesAddedList = res.items;
      this.totalResults = res.itemCount;
      this.userMovieListItem = res;
      this.loadingMoviesAddedList = false;
    });
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
