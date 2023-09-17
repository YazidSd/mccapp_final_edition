import { TestBed } from '@angular/core/testing';

import { NotefraisService } from './notefrais.service';

describe('NotefraisService', () => {
  let service: NotefraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotefraisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
