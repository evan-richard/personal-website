import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ANIMATED_DOWN, ANIMATED_UP } from '@shared/constants';

@Component({
  selector: 'app-animated-transition-bars',
  templateUrl: './animated-transition-bars.component.html',
  styleUrls: ['./animated-transition-bars.component.scss']
})
export class AnimatedTransitionBarsComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() scrollPosition: number;

  @ViewChild('transitionRef') transitionRef: ElementRef;
  @ViewChildren('transitionBlock') transitionBlockRef: QueryList<ElementRef>;

  animationDirection: Array<string> = [];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.transitionBlockRef.forEach(block => {
      if (Math.floor(Math.random() * 2) === 0) {
        this.animationDirection.push(ANIMATED_UP);
      } else {
        this.animationDirection.push(ANIMATED_DOWN);
      }
      const someHeight = Math.floor(Math.random() * 21) + 3;
      block.nativeElement.style.height = `${someHeight}rem`;
    })
    console.log(this.animationDirection);
  }

  ngOnChanges(): void {
    const transitionThreshold = this.transitionRef.nativeElement.offsetTop - 600;
    if (this.scrollPosition >= transitionThreshold && this.scrollPosition <= transitionThreshold + 1000) {
      this.transitionBlockRef.forEach((block, index) => {
        let newHeight;
        const currentBlockHeight = parseFloat(block.nativeElement.style.height.slice(0, block.nativeElement.style.height.length - 3));
        if (this.animationDirection[index] === ANIMATED_UP) {
          newHeight = currentBlockHeight + ((this.scrollPosition - transitionThreshold) / 4500) >= 23 ? 23 : currentBlockHeight + (this.scrollPosition - transitionThreshold) / 4500;
        } else {
          newHeight = currentBlockHeight + (transitionThreshold - this.scrollPosition) / 4500 <= 3 ? 3 : currentBlockHeight + (transitionThreshold - this.scrollPosition) / 4500;
        }
        if (newHeight === 23) {
          this.animationDirection[index] = ANIMATED_DOWN;
        } else if (newHeight === 3) {
          this.animationDirection[index] = ANIMATED_UP;
        }
        block.nativeElement.style.height = `${newHeight}rem`;
      })
    }
  }
}
