import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PARAGRAPH_TEXT } from '@landing/constants';

@Component({
  selector: 'app-welcome-letter',
  templateUrl: './welcome-letter.component.html',
  styleUrls: ['./welcome-letter.component.scss']
})
export class WelcomeLetterComponent implements OnInit {

  @Input() viewingState: string;
  @Output() stateChange: EventEmitter<string> = new EventEmitter<string>();

  readonly DESCRIPTION = PARAGRAPH_TEXT;

  constructor() { }

  ngOnInit(): void { }
}
