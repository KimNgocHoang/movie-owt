import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Trending } from 'src/app/core/models/trending.model';
import { ShowsService } from '../../shows.service';
import { SearchRequest } from '../../type/search-request.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  type = 'day';
  trendingList: Trending[];
  counter = 0;
  loading = true;
  constructor(
    private showsService: ShowsService,
    public translate: TranslateService
  ) {}
  ngOnInit() {
    this.getTrending(
      {
        page: 1,
      },
      this.type
    );
  }

  onChange($event) {
    this.type = $event.value;
    this.getTrending(
      {
        page: 1,
      },
      this.type
    );
  }

  getTrending(request: SearchRequest, type: string) {
    this.loading = true;
    this.showsService.getTrending(request, type).subscribe((res) => {
      this.trendingList = res.results;
      this.loading = false;
    });
  }

  onNext() {
    if (this.counter != this.trendingList.length - 1) {
      this.counter++;
      this.trendingList.push(this.trendingList[0])
      this.trendingList.shift();
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
      this.trendingList.unshift(
        this.trendingList[this.trendingList.length - 1]
      );
      this.trendingList.pop();
    }
  }
}
