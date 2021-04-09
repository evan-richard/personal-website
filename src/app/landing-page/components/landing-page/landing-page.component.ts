import { Component, OnInit } from '@angular/core';
import { VIEWING_STATES } from '@landing/constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  scrollPosition: number = 0;

  onScroll(event): void {
    if (event) {
      this.scrollPosition = event.srcElement.scrollTop;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
