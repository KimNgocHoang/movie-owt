import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  @Input() shape: 'image' | 'text';
  @Input() width: string = '100%';
  @Input() height: string = '100%';
}
