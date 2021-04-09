import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedTransitionBarsComponent } from './animated-transition-bars.component';

describe('AnimatedTransitionBarsComponent', () => {
  let component: AnimatedTransitionBarsComponent;
  let fixture: ComponentFixture<AnimatedTransitionBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedTransitionBarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedTransitionBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
