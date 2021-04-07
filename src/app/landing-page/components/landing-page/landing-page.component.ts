import { Component, OnInit } from '@angular/core';
import { VIEWING_STATES } from '@landing/constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  viewingState: string = VIEWING_STATES.COMPUTER_SCREEN;

  onViewingStateChange(newState: string): void {
    this.viewingState = newState;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
