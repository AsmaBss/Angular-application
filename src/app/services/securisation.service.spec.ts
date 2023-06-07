import { TestBed } from '@angular/core/testing';

import { SecurisationService } from './securisation.service';

describe('SecurisationService', () => {
  let service: SecurisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
