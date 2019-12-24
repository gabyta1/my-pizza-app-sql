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

  constructor(private orderService: OrderService, private mealService: MealsService) { }

  ngOnInit() {
    this.toppings = this.orderService.getTopping();
  }

  onContinue() {

    this.carts = new Cart(this.mealService.getOrderChooseName(),
      this.mealService.getOrderChoosePrice(), this.mealService.getTopping(), this.orderService.getCnt());
    console.log(this.mealService.getOrderChooseName());
    this.orderService.addItemCart(this.carts);
    this.top = this.mealService.getTopping();
    console.log(this.top);
    this.orderService.addPrice(this.top.length);
    this.mealService.resetTopping();
    this.listorder = true;
    console.log(this.top);

    this.orderService.resetSelectedTopping();

  }

  onEdit() {
    this.orderService.setCartTopping(this.mealService.getTopping());
    this.mealService.resetTopping();
    this.orderService.resetSelectedTopping();
    this.orderService.setEditButton();
  }

}
