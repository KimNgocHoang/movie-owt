import { Subject, debounceTime } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Show } from 'src/app/features/shows/models/show.model';
import { SearchRequest } from 'src/app/features/shows/type/search-request.type';
import { MyListsService } from '../../services/my-lists.service';
import { MovieService } from 'src/app/features/shows/services/movie.service';
import { ParamsRequest } from '../../type/params-request.type';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-my-list-details',
  templateUrl: './my-list-details.component.html',
  styleUrls: ['./my-list-details.component.scss'],
})
export class MyListDetailsComponent implements OnInit {
  movies: Show[];
  myList: ListItem;
  listId: number;
  searchText: string;
  searchTextUpdate = new Subject<string>();
  loading = true;
  totalResults: number;
  openModal = false;

  constructor(
    public translate: TranslateService,
    private myListService: MyListsService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = +params['id'];
    });
    this.getMyListDetails({ listId: this.listId });
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
        : this.getMoviesByListId({ listId: this.listId });
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

  getMoviesByListId(paramsRequest: ParamsRequest) {
    this.loading = true;
    this.myListService.getMyListDetails(paramsRequest).subscribe((res) => {
      this.movies = res.items;
      this.totalResults = res.itemCount;
      this.loading = false;
    });
  }

  getMyListDetails(paramsRequest: ParamsRequest) {
    this.myListService.getMyListDetails(paramsRequest).subscribe((res) => {
      this.myList = res;
    });
  }

  onIsSuggestChange(value: boolean) {
    this.openModal = value;
  }

  closeModal() {
    this.openModal = false;
  }
}
