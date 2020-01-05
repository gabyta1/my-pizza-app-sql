import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Topping} from '../../topping.module';
import {OrderService} from '../order.service';
import {Cart} from '../../shopping-cart.module';
import {MealsService} from '../../meals/meals.service';

@Component({
  selector: 'app-toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent implements OnInit {
  toppings: Topping[];
  listorder = false;
  top: Topping[];
  carts: Cart;

  constructor(private orderService: OrderService, private mealService: MealsService, private router: Router) { }

  ngOnInit() {
    this.toppings = this.orderService.getTopping();
  }

  onContinue() {

    this.carts = new Cart(this.mealService.getOrderChooseName(),
      this.mealService.getOrderChoosePrice(), this.mealService.getTopping(), this.orderService.getCnt());
    this.orderService.addItemCart(this.carts);
    this.top = this.mealService.getTopping();
    this.orderService.addPrice(this.top.length);
    this.mealService.resetTopping();
    this.orderService.resetSelectedTopping();
    this.router.navigate(['order']);
    this.orderService.setOpenCloseElem(true);

  }

  onEdit() {
    this.orderService.setCartTopping(this.mealService.getTopping());
    this.mealService.resetTopping();
    this.orderService.resetSelectedTopping();
    this.orderService.setEditButton();
    this.router.navigate(['order']);
    this.orderService.setOpenCloseElem(true);
  }

}
