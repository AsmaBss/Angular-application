import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationImagesComponent } from './observation-images.component';

describe('ObservationImagesComponent', () => {
  let component: ObservationImagesComponent;
  let fixture: ComponentFixture<ObservationImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
