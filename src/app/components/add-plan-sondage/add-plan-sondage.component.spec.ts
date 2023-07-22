import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanSondageComponent } from './add-plan-sondage.component';

describe('AddPlanSondageComponent', () => {
  let component: AddPlanSondageComponent;
  let fixture: ComponentFixture<AddPlanSondageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanSondageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlanSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
