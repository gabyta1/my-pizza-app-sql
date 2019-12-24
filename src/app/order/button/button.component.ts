import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Topping} from '../../topping.module';
import {Cart} from '../../shopping-cart.module';
import {MealsService} from '../../meals/meals.service';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() topping: Topping;
  @Input() index: number;
  cart: Cart;

  constructor(private orderService: OrderService, private mealService: MealsService) { }


  onClickDown() {
    if (!this.orderService.getEditButton()) {
    this.topping.selected = !this.topping.selected;
    if (this.topping.selected) {
      console.log(this.topping.selected);
      this.mealService.addTopping(this.topping);
    } else {
        this.mealService.decTopping(this.topping.name);
        console.log(this.topping.selected);
    }
  } else {
    this.topping.selected = !this.topping.selected;
    if (this.topping.selected) {
      this.mealService.addTopping(this.topping);
      this.orderService.addPrice(this.topping.price);
    } else {
        this.mealService.decTopping(this.topping.name);
        this.orderService.decPrice(this.topping.price);
    }

  }

}


}
