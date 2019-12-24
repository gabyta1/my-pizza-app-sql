import { Component, OnInit } from '@angular/core';
import {BranchService} from '../../branch/branch.service';
import {Router} from '@angular/router';
import {OrderService} from '../order.service';
import {Cart} from '../../shopping-cart.module';
import {MealsService} from '../../meals/meals.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent implements OnInit {
  deliChoice = true;
  selfChoice = true;
  selfPickChoice = true;
  deliveryChoice = true;
  carts: Cart;
  cityName: string;
  idBranch: number;
  time = false;


  constructor( public storeService: BranchService,
               public orderService: OrderService,
               private mealService: MealsService,
               private router: Router) { }

  ngOnInit() {
  }

  onDeliveryChoice() {
    this.deliChoice = false;
    this.orderService.setTimeBox();
    this.orderService.setTypeOfOrder('delivery');
  }

  onSelfChoice() {
    this.selfChoice = false;
    this.orderService.setTimeBox();
    this.orderService.setTypeOfOrder('selfpick');
  }

  onChoiceSelfPick() {
    this.selfPickChoice = false;
    console.log(this.cityName);
    this.idBranch = this.storeService.findCityId(this.cityName);
    this.orderService.setdetailsDelivery(this.idBranch, 0 , '');
    if (this.orderService.getId() === 'pizza') {
      this.router.navigate(['order/toppings']);
    } else {
      this.carts = new Cart(this.mealService.getOrderChooseName(), this.mealService.getOrderChoosePrice(),
        this.mealService.getTopping(), this.orderService.getCnt());
      this.orderService.addItemCart(this.carts);
      this.router.navigate(['order']);
    }
  }

  // onChoiceDelivery() {
  //   this.deliveryChoice = false;
  //   console.log(this.cityName);
  //   if (this.orderService.getId() === 'pizza') {
  //     this.router.navigate(['order/toppings']);
  //   } else {
  //     this.carts = new Cart(this.mealService.getOrderChooseName(), this.mealService.getOrderChoosePrice(),
  //       this.mealService.getTopping(), this.orderService.getCnt());
  //     this.orderService.addItemCart(this.carts);
  //     this.router.navigate(['order']);
  //   }

  // }

  onAddItem(f: NgForm) {
    console.log(f.value);
    this.deliveryChoice = false;
    console.log(f.value.street + ' ' + f.value.homenum);
    console.log(this.cityName);
    this.idBranch = this.storeService.findCityId(this.cityName);
    this.orderService.setdetailsDelivery(this.idBranch, f.value.homenum, f.value.street);
    if (this.orderService.getId() === 'pizza') {
      this.router.navigate(['order/toppings']);
    } else {
      this.carts = new Cart(this.mealService.getOrderChooseName(), this.mealService.getOrderChoosePrice(),
        this.mealService.getTopping(), this.orderService.getCnt());
      this.orderService.addItemCart(this.carts);
      this.router.navigate(['order']);
    }
  }

}
