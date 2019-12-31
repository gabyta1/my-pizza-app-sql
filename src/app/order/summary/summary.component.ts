import { Router } from '@angular/router';
import { Cart } from './../../shopping-cart.module';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  x = [{ say: 'hello', price: 1, name: ['gaby', 'nurit'] }, {say: 'bii', price: 0, name: ['agam', 'avner']}];
  cart: Cart[];
  constructor(public orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.cart = this.orderService.getCart();
    console.log(this.cart[0]);
  }

  onPay() {
    this.orderService.getNumOrder();   // get from the database
    this.router.navigate(['payment-info']);
  }

}
