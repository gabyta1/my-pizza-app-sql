import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOrderComponent } from './end-order.component';

describe('EndOrderComponent', () => {
  let component: EndOrderComponent;
  let fixture: ComponentFixture<EndOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
