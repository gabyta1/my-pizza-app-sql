import { Topping } from './../../topping.module';
import { Cart } from './../../shopping-cart.module';
import { OrderService } from './../order.service';
import { MealsService } from './../../meals/meals.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  @Input() try: Cart;
  @Input() index: number;
  toppings: Topping[];

  constructor(private mealService: MealsService, public orderService: OrderService,  private router: Router) { }

  ngOnInit() {
  }

  heppend() {
    console.log(this.try);
    console.log(this.index);
    this.orderService.DeleteItemCart(this.index);
  }
  editOrder() {
    this.orderService.setOpenCloseElem(false);
    const tops = this.orderService.getEditOrderTopping(this.index);
    this.toppings = this.orderService.getTopping().map(topping => {
      const isSelected = tops.some(top => top.name === topping.name);
      topping.selected = isSelected;
      return topping;
    });
    console.log(this.toppings);
    this.orderService.setIndexEditCart(this.index);
    this.orderService.setEditButton();

    this.orderService.getEditOrderTopping(this.index).forEach((item) => {
      this.mealService.addTopping(item);
 });
    this.router.navigate(['order/toppings']);

  }

}
