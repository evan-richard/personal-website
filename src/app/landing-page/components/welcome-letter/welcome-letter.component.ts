import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { PARAGRAPH_TEXT, VIEWING_STATES } from '@landing/constants';
import { FADE_ANIMATION_DESCRIPTION_KEY, FADE_ANIMATION_TITLE_KEY, NOT_VISIBLE, VISIBLE } from '@shared/constants';

@Component({
  selector: 'app-welcome-letter',
  animations: [
    trigger(FADE_ANIMATION_TITLE_KEY, [
      state(NOT_VISIBLE, style({
        opacity: 0,
        transform: 'translate(0, -2rem)'
      })),
      state(VISIBLE, style({
        opacity: 1,
        transform: 'translate()'
      })),
      transition(`${NOT_VISIBLE} => ${VISIBLE}`, [
        animate('.75s')
      ]),
    ]),
    trigger(FADE_ANIMATION_DESCRIPTION_KEY, [
      state(NOT_VISIBLE, style({
        opacity: 0
      })),
      state(VISIBLE, style({
        opacity: 1
      })),
      transition(`${NOT_VISIBLE} => ${VISIBLE}`, [
        animate('1s .5s')
      ]),
    ]),
  ],
  templateUrl: './welcome-letter.component.html',
  styleUrls: ['./welcome-letter.component.scss']
})
export class WelcomeLetterComponent implements OnInit {

  @Input() scrollPosition: number;

  readonly DESCRIPTION = PARAGRAPH_TEXT;

  loadingState = NOT_VISIBLE;

  constructor() { }

  ngOnInit(): void {
    this.loadingState = VISIBLE;
  }
}
