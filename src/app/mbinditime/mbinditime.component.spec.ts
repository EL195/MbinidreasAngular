import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbinditimeComponent } from './mbinditime.component';

describe('MbinditimeComponent', () => {
  let component: MbinditimeComponent;
  let fixture: ComponentFixture<MbinditimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbinditimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbinditimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
