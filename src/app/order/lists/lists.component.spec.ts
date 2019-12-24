import { OrderService } from './../order.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsComponent } from './lists.component';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ListsComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ListsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should return 2', () => {
    //expect(component).toBeTruthy();
    // let spy = spyOn(service, 'DeleteItemCart').and.callFake(()=> {

    // })

    let i = 2;
    // this.heppend();
    expect(i).toBe(3);



  });
});
