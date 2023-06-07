import { TestBed } from '@angular/core/testing';

import { ObservationImagesService } from './observation-images.service';

describe('ObservationImagesService', () => {
  let service: ObservationImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservationImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
