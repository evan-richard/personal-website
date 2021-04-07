import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { PARAGRAPH_TEXT } from '@landing/constants';

@Component({
  selector: 'app-welcome-letter',
  animations: [
    trigger('letterAnimation', [
      state('notInRange', style({
        transform: 'translate()'
      })),
      state('inRange', style({
        transform: 'translate(0.5rem, 0.5rem)'
      })),
      transition('notInRange => inRange', [
        animate('0.3s')
      ]),
      transition('inRange => notInRange', [
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
        if (Math.abs((charElement.offsetTop + 20) - event.clientY) < 15
          && Math.abs((charElement.offsetLeft + 20) - event.clientX) < 15) {
          this.characterAnimations[index] = "inRange";
        } else {
          this.characterAnimations[index] = "notInRange";
        }
      });
    }
  }

  clickHandler() {
    console.log('click');
    this.characterAnimations[5] = "inRange";
    this.characterAnimations[6] = "inRange";
    this.characterAnimations[7] = "inRange";
    this.characterAnimations[8] = "inRange";
  }

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    let elements = ""
    for (let i = 0; i < PARAGRAPH_TEXT.length; i++){
      this.characterAnimations.push("notInRange");
      const character = PARAGRAPH_TEXT.charAt(i);
      this.characters.push(character);
      let el: string;
      if (character === '\n') {
        el = '<br />';
        // el = this.renderer.createElement('br');
      } else {
        if (character !== ' ') {
          el = `<span [@letterAnimation]="characterAnimations[${i}]">${character}</span>`;
        } else {
          el = `<span>${character}</span>`
        }
        // el = this.renderer.createElement('span');
        // el.setAttribute('@letterAnimation', this.lettersInRange[i].inRange)
        // el.textContent = character;
      }
      elements += el;
      // this.renderer.appendChild(this.paragraphRef.nativeElement, el);
    }
    // this.paragraphRef.nativeElement.innerHTML = elements;
  }

}
