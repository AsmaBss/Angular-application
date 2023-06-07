import { TestBed } from '@angular/core/testing';

import { PlanSondageService } from './plan-sondage.service';

describe('PlanSondageService', () => {
  let service: PlanSondageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanSondageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
