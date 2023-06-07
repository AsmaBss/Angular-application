import { TestBed } from '@angular/core/testing';

import { PasseService } from './passe.service';

describe('PasseService', () => {
  let service: PasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
