import { Component } from '@angular/core';
import {Menu} from './menu.module';
import {MealsService} from './meals/meals.service';
import {OrderService} from './order/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-pizza-app';
  show = false;
  str = 'show';






  onShow() {
    this.show = !this.show;
  }




  }
