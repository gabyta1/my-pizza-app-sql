import { OrderService } from './../../order.service';
import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit {

hour = [10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23 , 24];
minute = ['00', 15, 30, 45];
curTime = new Date();
orderHour = this.curTime.getHours();
myHour: number;
Myminute: any;




  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  selectTime() {
     this.orderService.setTimeBox();
     this.orderService.setTimeOrder(this.myHour, this.Myminute);
     this.orderService.getTimeOrder();
  }
}
