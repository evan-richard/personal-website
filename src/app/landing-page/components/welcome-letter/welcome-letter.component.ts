import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IN_RANGE_STATE, LETTER_IN_RANGE_THRES, LETTER_OFFSET, NOT_IN_RANGE_STATE, PARAGRAPH_TEXT } from '@landing/constants';

@Component({
  selector: 'app-welcome-letter',
  animations: [
    trigger('letterAnimation', [
      state(NOT_IN_RANGE_STATE, style({
        transform: 'translate()'
      })),
      state(IN_RANGE_STATE, style({
        transform: 'translate(0.5rem, 0.5rem)'
      })),
      transition(`${NOT_IN_RANGE_STATE} => ${IN_RANGE_STATE}`, [
        animate('0.3s')
      ]),
      transition(`${IN_RANGE_STATE} => ${NOT_IN_RANGE_STATE}`, [
        animate('0.3s')
      ]),
    ]),
  ],
  templateUrl: './welcome-letter.component.html',
  styleUrls: ['./welcome-letter.component.scss']
})
export class WelcomeLetterComponent implements OnInit, AfterViewInit {

  @Input() viewingState: string;
  @Output() stateChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('headerRef') headerRef: ElementRef;
  @ViewChild('paragraphRef') paragraphRef: ElementRef;

  characters = [];
  characterAnimations: Array<string> = [];

  @HostListener('mousemove', ['$event']) 
  onMouseMove(event: MouseEvent): void {
    if (event) {
      Array.from((this.paragraphRef.nativeElement.children)).forEach((charElement: HTMLElement, index) => {
        if (Math.abs((charElement.offsetTop + LETTER_OFFSET) - event.clientY) < LETTER_IN_RANGE_THRES
          && Math.abs((charElement.offsetLeft + LETTER_OFFSET) - event.clientX) < LETTER_IN_RANGE_THRES) {
          this.characterAnimations[index] = IN_RANGE_STATE;
        } else {
          this.characterAnimations[index] = NOT_IN_RANGE_STATE;
        }
      });
    }
  }

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    for (let i = 0; i < PARAGRAPH_TEXT.length; i++){
      this.characterAnimations.push(NOT_IN_RANGE_STATE);
      this.characters.push(PARAGRAPH_TEXT.charAt(i));
    }
  }

}
