import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgegroupComponent } from './agegroup.component';

describe('AgegroupComponent', () => {
  let component: AgegroupComponent;
  let fixture: ComponentFixture<AgegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgegroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
