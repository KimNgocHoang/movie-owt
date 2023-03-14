import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  shape: string;
  w: string;
  h: string;
  constructor(private elementRef: ElementRef) {
    this.shape = this.elementRef.nativeElement.getAttribute('shape');
    this.w = this.elementRef.nativeElement.getAttribute('w');
    this.h = this.elementRef.nativeElement.getAttribute('h');
  }
}
