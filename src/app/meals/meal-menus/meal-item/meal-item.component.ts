import {Component, Input, OnInit} from '@angular/core';
import {Menu} from '../../../menu.module';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MealsService} from '../../meals.service';
import {OrderService} from '../../../order/order.service';
import {Cart} from '../../../shopping-cart.module';


@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.css']
})
export class MealItemComponent implements OnInit {
@Input() menu: Menu;
@Input() index: number;
  id: string;
  button = true;
  carts: Cart;



  constructor(private route: ActivatedRoute,
              private mealService: MealsService,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>  {
        this.id = params['id'];
        this.orderService.setId(this.id);
      }

    );

  }
  onOrder() {
    this.mealService.setOrder(true);
    this.mealService.setOrderChoose(this.mealService.getMeals(this.index));
    console.log(this.mealService.getOrderChoose());
    if (this.orderService.getOrder()) {
      this.router.navigate(['order/pick']);
    } else {
      if (this.id === 'pizza') {
        this.router.navigate(['order/toppings']);
        this.orderService.setOpenCloseElem(false);
      } else {
        this.carts = new Cart(this.mealService.getOrderChooseName(), this.mealService.getOrderChoosePrice(),
          this.mealService.getTopping(), this.orderService.getCnt());
        this.orderService.addItemCart(this.carts);
        this.router.navigate(['order']);
      }
    }
    this.orderService.setOrder(false);
  }
  onSelectDrink() {
    this.mealService.setOrderChoose(this.mealService.getMeals(this.index));
    this.orderService.setButton(this.button);
  }
}
