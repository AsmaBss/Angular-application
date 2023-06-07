import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSondageComponent } from './plan-sondage.component';

describe('PlanSondageComponent', () => {
  let component: PlanSondageComponent;
  let fixture: ComponentFixture<PlanSondageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanSondageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
