import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotmemberComponent } from './notmember.component';

describe('NotmemberComponent', () => {
  let component: NotmemberComponent;
  let fixture: ComponentFixture<NotmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotmemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
