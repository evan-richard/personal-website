import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerScreenComponent } from './computer-screen.component';

describe('ComputerScreenComponent', () => {
  let component: ComputerScreenComponent;
  let fixture: ComponentFixture<ComputerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
