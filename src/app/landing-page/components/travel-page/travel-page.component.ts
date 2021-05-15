import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { TRAVEL_STORIES } from '@landing/constants';

@Component({
  selector: 'app-travel-page',
  templateUrl: './travel-page.component.html',
  styleUrls: ['./travel-page.component.scss']
})
export class TravelPageComponent implements OnInit, OnChanges {

  @ViewChild('containerRef') containerRef: ElementRef;

  @Input() scrollPosition: number;

  readonly TRAVEL_STORIES = TRAVEL_STORIES;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    const top = this.containerRef.nativeElement.offsetTop;
    const bottom = this.containerRef.nativeElement.offsetTop + this.containerRef.nativeElement.offsetHeight;
    if (this.scrollPosition < top) {
      this.containerRef.nativeElement.style.opacity = 0;
    }

    if (this.scrollPosition >= top
          && this.scrollPosition < bottom) {
      const opacity = (this.scrollPosition - top) / 500;
      this.containerRef.nativeElement.style.opacity = opacity > 1 ? 1 : opacity;
    }

    if (this.scrollPosition >= bottom) {
      const opacity = 1 - (this.scrollPosition - bottom) / 500;
      this.containerRef.nativeElement.style.opacity = opacity < 0 ? 0 : opacity;
    }
  }

}
