import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  @Input() shape: 'image' | 'text';
  @Input() width: string;
  @Input() height: string;

  ngOnInit() {
    this.width = this.width ? this.width : '100%';
    this.height = this.height ? this.height : '100%';
  }
}
