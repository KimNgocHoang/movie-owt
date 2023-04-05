import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TvShow } from '../../models/tv-show.model';
import { TvShowService } from '../../tv-shows.service';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss'],
})
export class TvShowDetailsComponent implements OnInit, OnDestroy {
  tvShow: TvShow;
  genres: string;
  loading = true;
  getTvShowByApiSub: Subscription;

  constructor(
    private tvShowService: TvShowService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTvShowByApiSub = this.route.params.subscribe((params: Params) => {
      this.getTvShow(+params['id']);
    });
  }

  getTvShow(id: number) {
    this.loading = true;
    this.tvShowService.getTvShowById(id).subscribe((res) => {
      this.tvShow = res;
      this.genres = res.genres.map((genre) => genre.name).join(', ');
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.getTvShowByApiSub.unsubscribe();
  }
}
