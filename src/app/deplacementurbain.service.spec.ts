import { TestBed } from '@angular/core/testing';

import { DeplacementurbainService } from './deplacementurbain.service';

describe('DeplacementurbainService', () => {
  let service: DeplacementurbainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeplacementurbainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
