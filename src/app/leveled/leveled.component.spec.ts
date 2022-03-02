import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveledComponent } from './leveled.component';

describe('LeveledComponent', () => {
  let component: LeveledComponent;
  let fixture: ComponentFixture<LeveledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeveledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeveledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
