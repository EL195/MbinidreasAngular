import { TestBed } from '@angular/core/testing';

import { ConnecionService } from './connecion.service';

describe('ConnecionService', () => {
  let service: ConnecionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnecionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
