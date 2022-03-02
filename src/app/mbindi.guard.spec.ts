import { TestBed } from '@angular/core/testing';

import { MbindiGuard } from './mbindi.guard';

describe('MbindiGuard', () => {
  let guard: MbindiGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MbindiGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
