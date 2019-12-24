import { Cart } from './../shopping-cart.module';
import { Component, OnInit, ElementRef } from '@angular/core';
import {MealsService} from '../meals/meals.service';
import {OrderService} from './order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

try: Cart;




  constructor(private mealService: MealsService, public orderService: OrderService,
              private router: Router) {}

  ngOnInit() {
  }




  addItems() {
    this.router.navigate(['/meals/beverages']);
  }
  continue(){
    this.router.navigate(['order/summary']);
  }




}


