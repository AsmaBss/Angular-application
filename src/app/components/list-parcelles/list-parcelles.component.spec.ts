import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParcellesComponent } from './list-parcelles.component';

describe('ListParcellesComponent', () => {
  let component: ListParcellesComponent;
  let fixture: ComponentFixture<ListParcellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParcellesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParcellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
