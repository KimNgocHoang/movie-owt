import { Observable, Subscription, debounceTime, map, startWith } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { UserMovieList } from '../../models/user-movie-list.model';
import { UserListsService } from '../../services/user-lists.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateMovieRequest } from '../../types/create-movie-request.type';
import { ToastComponent } from '../../components/toast/toast.component';
import { MessageStatus } from '../../enum/message-status.enum';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: Movie;
  lists: UserMovieList[];
  genres: string;
  loading = true;
  loadingList = true;
  message: string;
  listCtrl = new FormControl('');
  filteredLists: Observable<UserMovieList[]>;
  getMovieByApiSub: Subscription;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private userListsService: UserListsService,
    private _snackBar: MatSnackBar
  ) {}

  private _filterStates(value: string): UserMovieList[] {
    const filterValue = value.toLowerCase();

    return this.lists.filter((list) =>
      list.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.getMovieByApiSub = this.route.params.subscribe((params: Params) => {
      this.movie = this.getMovie(+params['id']);
    });
    this.getLists();
    this.filteredLists = this.listCtrl.valueChanges.pipe(
      debounceTime(1000),
      startWith(''),
      map((list) => (list ? this._filterStates(list) : this.lists.slice()))
    );
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

  getLists() {
    this.loadingList = true;
    this.userListsService.getUserLists().subscribe((res) => {
      this.lists = res.results;
      this.loadingList = false;
    });
    return this.lists;
  }

  addItem(createMovieRequest: CreateMovieRequest) {
    this.userListsService
      .addMovieToList(createMovieRequest)
      .subscribe((response) => {
        response.success
          ? (this.message = MessageStatus.SUCCESS)
          : (this.message = MessageStatus.ERROR);
        this._snackBar.openFromComponent(ToastComponent, {
          duration: 2000,
          data: this.message,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  ngOnDestroy(): void {
    this.getMovieByApiSub.unsubscribe();
  }
}
