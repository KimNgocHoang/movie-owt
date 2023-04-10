import { Component, OnInit } from '@angular/core';
import { SearchRequest } from '../../types/search-request.type';
import { Subject, debounceTime } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { UserListsService } from '../../services/user-lists.service';
import { TranslateService } from '@ngx-translate/core';
import { Show } from '../../models/show.model';
import { UserMovieListItem } from '../../models/user-movie-list-item.model';
import { Location } from '@angular/common';
import { ParamsRequest } from '../../types/params-request.type';

@Component({
  selector: 'app-user-movie-list-details',
  templateUrl: './user-movie-list-details.component.html',
  styleUrls: ['./user-movie-list-details.component.scss'],
})
export class UserMovieListDetailsComponent implements OnInit {
  movies: Show[];
  userMovieListItem: UserMovieListItem;
  listId: number;
  searchText: string;
  searchTextUpdate = new Subject<string>();
  loading = true;
  totalResults: number;
  openModal = false;

  constructor(
    public translate: TranslateService,
    private userListsService: UserListsService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = +params['id'];
    });
    this.getUserListDetails({ listId: this.listId });
    this.searchText = this.route.snapshot.queryParams.search;
    this.searchTextUpdate.pipe(debounceTime(1000)).subscribe((results) => {
      this.search(results);
    });
    this.route.queryParamMap.subscribe((results) => {
      results.get('search')
        ? this.getMoviesBySearch({
            query: results.get('search'),
            page: +results.get('page') === 0 ? 1 : +results.get('page'),
          })
        : this.getUserListDetails({ listId: this.listId });
    });
  }

  search(term: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: term },
      queryParamsHandling: 'merge',
    });
  }

  getMoviesBySearch(searchMoviesRes: SearchRequest) {
    this.loading = true;
    this.movieService
      .getPopularMoviesBySearch(searchMoviesRes)
      .subscribe((res) => {
        this.movies = res.results;
        this.totalResults = res.totalResults;
        this.loading = false;
      });
  }

  getUserListDetails(paramsRequest: ParamsRequest) {
    this.loading = true;
    this.userListsService.getUserListDetails(paramsRequest).subscribe((res) => {
      this.movies = res.items;
      this.totalResults = res.itemCount;
      this.userMovieListItem = res;
      this.loading = false;
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
