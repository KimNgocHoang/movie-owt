import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Show } from '../../models/show.model';
import { SearchRequest } from '../../type/search-request.type';
import { TimeWindow } from '../../enum/time-window.enum';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  type = TimeWindow.DAY;
  showList: Show[];
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

  getTrending(request: SearchRequest, type: TimeWindow) {
    this.loading = true;
    this.showsService.getTrending(request, type).subscribe((res) => {
      this.showList = res.results;
      this.loading = false;
    });
  }
}
