import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-computer-screen',
  templateUrl: './computer-screen.component.html',
  styleUrls: ['./computer-screen.component.scss']
})
export class ComputerScreenComponent {

  private config = [
    {
      transform: { x: -190, y: -100, z: 0 }
    },
    {
      transform: { x: -50, y: -50, z: 0 }
    },
   ] as Array<ConfigModel>;

  @ViewChild('container') parallaxRef: ElementRef;
  @ViewChildren('transformRef') transformRef: QueryList<any>;

  @HostListener('mousemove', ['$event']) 
  onMouseMove(event: MouseEvent): void {
    if (event) {
      const rect = this.parallaxRef.nativeElement.getBoundingClientRect();
      let a1 = rect.left; let a2 = rect.right; let b1 = -1; let b2 = 1;
      const x = this.mapRange(a1, a2, b1, b2, event.x);
      a1 = rect.top; a2 = rect.bottom; b1 = 1; b2 = -1;
      const y = this.mapRange(a1, a2, b1, b2, event.y);

      if (x <= 1 && x >= -1 && y <= 1 && y >= -1) {
        this.transformRef.forEach((element, index) => {
          this.applyStyles(this.config[index], index === 0 ? element.el.style : element.nativeElement.style, { x, y, z: 1 }, index === 0)
        });
      }
    }
  }

  constructor() {}

  private applyStyles(config: ConfigModel, style: any, pos: PosModel3D, isRotated: boolean): void {
    const x = config.transform.x * -pos.x > 190 ? 190 : ((config.transform.x * -pos.x < -190) ? -190 : config.transform.x * -pos.x);
    const y = config.transform.y * pos.y > 100 ? 100 : ((config.transform.y * pos.y < -100) ? -100 : config.transform.y * pos.y);
    
    style.transform = `translate3d(${x}px, ${y}px, ${config.transform.z * pos.z}px)` + (isRotated ? ' rotate(-90deg)' : '')
  }

  private mapRange(a1: number, a2: number, b1: number, b2: number, value: number): number {
    return b1 + ((value - a1) *(b2 - b1)) / (a2 - a1);
  }

}

interface ConfigModel {
  transform: PosModel3D;
}

interface PosModel3D {
  x: number;
  y: number;
  z: number;
}
