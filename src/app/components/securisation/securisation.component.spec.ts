import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurisationComponent } from './securisation.component';

describe('SecurisationComponent', () => {
  let component: SecurisationComponent;
  let fixture: ComponentFixture<SecurisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurisationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
