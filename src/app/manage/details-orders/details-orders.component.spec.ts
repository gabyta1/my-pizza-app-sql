import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrdersComponent } from './details-orders.component';

describe('DetailsOrdersComponent', () => {
  let component: DetailsOrdersComponent;
  let fixture: ComponentFixture<DetailsOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
