import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedStoryComponent } from './animated-story.component';

describe('AnimatedStoryComponent', () => {
  let component: AnimatedStoryComponent;
  let fixture: ComponentFixture<AnimatedStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
