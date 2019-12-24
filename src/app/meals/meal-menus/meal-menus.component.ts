import {Component, OnInit, OnDestroy} from '@angular/core';
import {Menu} from '../../menu.module';
import {MealsService} from '../meals.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Cart} from '../../shopping-cart.module';
import {OrderService} from '../../order/order.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-meal-menus',
  templateUrl: './meal-menus.component.html',
  styleUrls: ['./meal-menus.component.css']
})
export class MealMenusComponent implements OnInit,  OnDestroy {
 menu = [];
 control: any = {};
 id: string;
 carts: Cart;
 subscription: Subscription;


  constructor(private mlService: MealsService, private route: ActivatedRoute,
              public orderService: OrderService,
              private http: HttpClient) { }

  ngOnInit() {
  this.mlService.getMeal().subscribe(res  => {
     this.menu = res;
     console.log(this.menu);
  });


  this.route.params.subscribe(
      (params: Params) =>  {
        this.id = params['id'];
      }

    );
  }

  addToCart() {
    this.carts = new Cart(this.mlService.getOrderChooseName(),
      this.mlService.getOrderChoosePrice(), [], this.orderService.getCnt());
    this.orderService.addItemCart(this.carts);
    this.orderService.setButton(false);
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }


}
