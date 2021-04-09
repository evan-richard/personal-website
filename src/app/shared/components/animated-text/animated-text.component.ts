import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { IN_RANGE_STATE, LETTER_IN_RANGE_THRES, LETTER_OFFSET, NOT_IN_RANGE_STATE, WAVE_ANIMATION_KEY } from '@shared/constants';

@Component({
  selector: 'app-animated-text',
  animations: [
    trigger(WAVE_ANIMATION_KEY, [
      state(NOT_IN_RANGE_STATE, style({
        transform: 'translate()'
      })),
      state(IN_RANGE_STATE, style({
        transform: 'translate({{ xOffset }}rem, {{ yOffset }}rem)'
      }), {params: {xOffset: 0, yOffset: 0}}),
      transition(`${NOT_IN_RANGE_STATE} => ${IN_RANGE_STATE}`, [
        animate('0.3s')
      ]),
      transition(`${IN_RANGE_STATE} => ${NOT_IN_RANGE_STATE}`, [
        animate('0.3s')
      ]),
    ]),
  ],
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss']
})
export class AnimatedTextComponent implements OnInit {

  @Input() animationKey: string = WAVE_ANIMATION_KEY;
  @Input() text: string;

  @HostListener('mousemove', ['$event']) 
  onMouseMove(event: MouseEvent): void {
    if (event) {
      Array.from((this.paragraphRef.nativeElement.children)).forEach((charElement: HTMLElement, index) => {
        if (Math.abs((charElement.offsetTop + LETTER_OFFSET) - event.clientY) < LETTER_IN_RANGE_THRES
          && Math.abs((charElement.offsetLeft + LETTER_OFFSET) - event.clientX) < LETTER_IN_RANGE_THRES) {
          this.characterAnimations[index].value = IN_RANGE_STATE;
          this.characterAnimations[index].xOffset = 0.5;
          this.characterAnimations[index].yOffset = 0.5;
        } else {
          this.characterAnimations[index].value = NOT_IN_RANGE_STATE;
          this.characterAnimations[index].xOffset = 0;
          this.characterAnimations[index].yOffset = 0;
        }
      });
    }
  }

  onDown(event: MouseEvent | TouchEvent): void {
    if (event) {
      Array.from((this.paragraphRef.nativeElement.children)).forEach((_, index) => {
        this.characterAnimations[index].value = IN_RANGE_STATE;
        this.characterAnimations[index].xOffset = Math.random() * 2 - 1;
        this.characterAnimations[index].yOffset = Math.random() * 2 - 1;
      });
    }
  }

  onUp(event: MouseEvent | TouchEvent): void {
    if (event) {
      Array.from((this.paragraphRef.nativeElement.children)).forEach((_, index) => {
        this.characterAnimations[index].value = NOT_IN_RANGE_STATE;
        this.characterAnimations[index].xOffset = 0;
        this.characterAnimations[index].yOffset = 0;
      });
    }
  }

  @HostListener('document:touchstart', ['$event'])
  onTouchDown(event: TouchEvent): void {
    this.onDown(event);
  }

  @HostListener('document:touchend', ['$event'])
  onTouchUp(event: TouchEvent): void {
    this.onUp(event);
  }

  // @HostListener('document:mousedown', ['$event'])
  // onMouseDown(event: MouseEvent): void {
  //   this.onDown(event);
  // }

  // @HostListener('document:mouseup', ['$event'])
  // onMouseUp(event: MouseEvent): void {
  //   this.onUp(event);
  // }

  @ViewChild('paragraphRef') paragraphRef: ElementRef;

  characters: Array<string> = [];
  characterAnimations: Array<AnimationValue> = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.text.length; i++){
      this.characterAnimations.push({
        value: NOT_IN_RANGE_STATE,
        xOffset: 0,
        yOffset: 0
      });
      this.characters.push(this.text.charAt(i));
    }
  }

}

interface AnimationValue {
  value: string;
  xOffset: number;
  yOffset: number;
}
