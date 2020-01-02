import { OrderService } from './../order/order.service';
import { Component, OnInit } from '@angular/core';
import {MealsService} from '../meals/meals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  constructor(public mealService: MealsService, private orderService: OrderService) { }

  ngOnInit() {
  }

  myOrder() {
    this.orderService.setOpenCloseElem(true);
  }

  toHome() {
    window.location.replace('');
  }


}
