import { TestBed } from '@angular/core/testing';

import { OrdremissionService } from './ordremission.service';

describe('OrdremissionService', () => {
  let service: OrdremissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdremissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
