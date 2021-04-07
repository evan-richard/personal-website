import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { VIEWING_STATES } from '@landing/constants';

@Component({
  selector: 'app-computer-screen',
  animations: [
    trigger('desktopScale', [
      state(VIEWING_STATES.COMPUTER_SCREEN, style({
        maxWidth: '30rem',
        width: 'unset',
        transform: 'translate()'
      })),
      state(VIEWING_STATES.NEW_MESSAGE, style({
        maxWidth: '120%',
        width: '112%',
        transform: 'translate(-4.5rem, -4rem)'
      })),
      transition(`${VIEWING_STATES.COMPUTER_SCREEN} => ${VIEWING_STATES.NEW_MESSAGE}`, [
        animate('0.5s')
      ]),
      transition(`${VIEWING_STATES.NEW_MESSAGE} => ${VIEWING_STATES.COMPUTER_SCREEN}`, [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './computer-screen.component.html',
  styleUrls: ['./computer-screen.component.scss']
})
export class ComputerScreenComponent {

  private cursorConfig: ConfigModel = {
    transform: { x: -190, y: -100 }
  };
  private mouseConfig: ConfigModel = {
    transform: { x: -50, y: -50 }
  };

  @Input() viewingState: string;
  @Output() stateChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('container') parallaxRef: ElementRef;
  @ViewChild('desktopRef') desktopRef: ElementRef;
  @ViewChild('mouseRef') mouseRef: ElementRef;
  @ViewChild('cursorRef') cursorRef: any;

  // Credit to Stephen Healey for parallax animation code.
  // Check out the original video here: https://www.youtube.com/watch?v=ftYffhOA84A
  // Title: Angular - 3D Animation on mouse move.
  // Author: Developer〈Web〉
  // Posted Jan 10, 2021
  @HostListener('mousemove', ['$event']) 
  onMouseMove(event: MouseEvent): void {
    if (event) {
      const rect = this.parallaxRef.nativeElement.getBoundingClientRect();
      let a1 = rect.left; let a2 = rect.right; let b1 = -1; let b2 = 1;
      const x = this.mapRange(a1, a2, b1, b2, event.x);
      a1 = rect.top; a2 = rect.bottom; b1 = 1; b2 = -1;
      const y = this.mapRange(a1, a2, b1, b2, event.y);

      if (x <= 1 && x >= -1 && y <= 1 && y >= -1) {
        this.applyStyles({ x, y })
      }
    }
  }

  @HostListener('mouseup', ['$event']) 
  onMouseUp(event: MouseEvent): void {
    if (event) {
      // const letterMaxX = 0.229 * this.desktopRef.nativeElement.width;
      // const letterMinX = -0.04583 * this.desktopRef.nativeElement.width;
      // const letterMaxY = -0.075 * this.desktopRef.nativeElement.width;
      // const letterMinY = -0.1897 * this.desktopRef.nativeElement.width;
      // console.log(`X: ${this.cursorRef.el.style.x}, Y: ${this.cursorRef.el.style.y}`)
      // console.log(`MinX: ${letterMinX}, MaxX: ${letterMaxX}, minY: ${letterMinY}, maxY: ${letterMaxY}`)
      // if (this.cursorRef.el.style.x <= letterMaxX
      //   && this.cursorRef.el.style.x >= letterMinX
      //   && this.cursorRef.el.style.y <= letterMaxY
      //   && this.cursorRef.el.style.y <= letterMinY) {
      //   console.log(this.desktopRef.nativeElement.width);
      //   console.log(this.cursorRef.el.style.y);
      // }
      this.stateChange.emit(VIEWING_STATES.NEW_MESSAGE);
    }
  }

  constructor() {}

  private applyStyles(pos: PosModel2D): void {
    // Apply cursor animation
    let x = this.cursorConfig.transform.x * -pos.x > 190
      ? 190 : ((this.cursorConfig.transform.x * -pos.x < -190)
        ? -190 : this.cursorConfig.transform.x * -pos.x);
    let y = this.cursorConfig.transform.y * pos.y > 100
      ? 100 : ((this.cursorConfig.transform.y * pos.y < -100)
        ? -100 : this.cursorConfig.transform.y * pos.y);
    this.cursorRef.el.style.x = x;
    this.cursorRef.el.style.y = y;
    this.cursorRef.el.style.transform = `translate(${x}px, ${y}px) rotate(-90deg)`

    // Apply mouse animation
    const element = this.mouseRef.nativeElement as HTMLElement;
    x = this.mouseConfig.transform.x * -pos.x;
    y = this.mouseConfig.transform.y * pos.y;
    element.style.transform = `translate(${x}px, ${y}px)`
  }

  private mapRange(a1: number, a2: number, b1: number, b2: number, value: number): number {
    return b1 + ((value - a1) *(b2 - b1)) / (a2 - a1);
  }

}

interface ConfigModel {
  transform: PosModel2D;
}

interface PosModel2D {
  x: number;
  y: number;
}
