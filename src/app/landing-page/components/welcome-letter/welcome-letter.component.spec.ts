import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLetterComponent } from './welcome-letter.component';

describe('WelcomeLetterComponent', () => {
  let component: WelcomeLetterComponent;
  let fixture: ComponentFixture<WelcomeLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
