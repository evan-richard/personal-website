import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnChanges, ViewChild } from '@angular/core';
import { VIEWING_STATES } from '@landing/constants';
import { NOT_VISIBLE, VISIBLE } from '@shared/constants';

@Component({
  selector: 'app-computer-screen',
  templateUrl: './computer-screen.component.html',
  styleUrls: ['./computer-screen.component.scss']
})
export class ComputerScreenComponent implements OnChanges {

  private cursorConfig: ConfigModel = {
    transform: { x: -180, y: -350 }
  };
  private mouseConfig: ConfigModel = {
    transform: { x: -50, y: -50 }
  };

  @Input() scrollPosition: number;

  @ViewChild('desktopContainer') parallaxRef: ElementRef;
  @ViewChild('contentRef') contentRef: ElementRef;
  @ViewChild('mouseRef') mouseRef: ElementRef;
  @ViewChild('cursorRef') cursorRef: any;
  @ViewChild('firstDecorationLabel') firstDecorationRef: ElementRef;
  @ViewChild('lastDecorationLabel') lastDecorationRef: ElementRef;

  // Credit to Stephen Healey for parallax animation code.
  // Check out the original video here: https://www.youtube.com/watch?v=ftYffhOA84A
  // Title: Angular - 3D Animation on mouse move.
  // Author: Developer〈Web〉
  // Posted Jan 10, 2021
  @HostListener('mousemove', ['$event']) 
  onMouseMove(event: MouseEvent): void {
    if (event) {
      const rect = this.parallaxRef.nativeElement.getBoundingClientRect();
      let a1 = 0; let a2 = rect.width; let b1 = -1; let b2 = 1;
      const x = this.mapRange(a1, a2, b1, b2, event.screenX);
      a1 = 0; a2 = rect.height; b1 = 1; b2 = -1;
      const y = this.mapRange(a1, a2, b1, b2, event.screenY);

      if (x <= 1 && x >= -1 && y <= 1 && y >= -1) {
        this.applyStyles({ x, y });
      }
    }
  }

  constructor() {}

  ngOnChanges(): void {
    if (this.scrollPosition < this.firstDecorationRef.nativeElement.offsetTop + 1000) {
      this.contentRef.nativeElement.style.opacity = 0;
    }

    if (this.scrollPosition >= this.firstDecorationRef.nativeElement.offsetTop + 1000
          && this.scrollPosition < this.lastDecorationRef.nativeElement.offsetTop + 1500) {
    // if (this.scrollPosition >= 1900 && this.scrollPosition < 5000) {
      const opacity = (this.scrollPosition - (this.firstDecorationRef.nativeElement.offsetTop + 1000)) / 500;
      this.contentRef.nativeElement.style.opacity = opacity > 1 ? 1 : opacity;
    }

    if (this.scrollPosition >= this.lastDecorationRef.nativeElement.offsetTop + 1500) {
      const opacity = 1 - (this.scrollPosition - (this.lastDecorationRef.nativeElement.offsetTop + 1500)) / 500;
      this.contentRef.nativeElement.style.opacity = opacity < 0 ? 0 : opacity;
    }
  }

  private applyStyles(pos: PosModel2D): void {
    let x;
    let y;
    // Apply cursor animation
    if (this.cursorRef) {
      x = this.cursorConfig.transform.x * -pos.x > 190
        ? 190 : ((this.cursorConfig.transform.x * -pos.x < -190)
          ? -190 : this.cursorConfig.transform.x * -pos.x);
      y = this.cursorConfig.transform.y * pos.y > 400
        ? 400 : ((this.cursorConfig.transform.y * pos.y < -400)
          ? -400 : this.cursorConfig.transform.y * pos.y);
      this.cursorRef.el.style.x = x;
      this.cursorRef.el.style.y = y;
      this.cursorRef.el.style.opacity = 1;
      this.cursorRef.el.style.transform = `translate(${x}px, ${y}px) rotate(-90deg)`;
    }

    // Apply mouse animation
    if (this.mouseRef) {
      const element = this.mouseRef.nativeElement as HTMLElement;
      x = this.mouseConfig.transform.x * -pos.x;
      y = this.mouseConfig.transform.y * pos.y + 75;
      element.style.transform = `translate(${x}px, ${y}px)`;
    }
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
