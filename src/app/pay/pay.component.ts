import { OrderService } from './../order/order.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
 id: string;
 typeCard: string;
  constructor(private orderService: OrderService) { }


  ngOnInit() {
  }

  onPay(form: NgForm) {
    console.log(this.typeCard);
    console.log(form.value.email);
    this.id = this.orderService.createUserId();
    this.orderService.setCredential(this.id, form.value.tel, form.value.email);
    this.orderService.createPost();
    this.orderService.setOrderToDb();
    this.orderService.setOrderItemDb();
  }



}
