import { Router } from '@angular/router';
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
  pass = 'Pizzato';
  constructor(public mealService: MealsService, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  }

  myOrder() {
    this.orderService.setOpenCloseElem(true);
  }

  toHome() {
    window.location.replace('');
  }

  toCheck() {
    const pass = prompt('Please Enter Password', 'password');

    if ( pass === this.pass) {
      this.router.navigate(['manage/menu']);
    } else {
    confirm('Wrong Password');
    this.router.navigate(['home']);
    return false;
    }
  }


}
