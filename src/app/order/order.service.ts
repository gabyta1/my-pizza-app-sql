import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Topping} from '../topping.module';
import {Cart} from '../shopping-cart.module';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;


@Injectable()
export class OrderService {



  constructor(private http: HttpClient) { }
  private toppings: Topping[] = [new Topping ('Olive',  1, false),
                                new Topping('Mozzarlea', 1, false),
                                new Topping('Corn', 1, false),
                                new Topping('Mushrooms', 1, false),
                                new Topping('pineapple', 1, false),
                                new Topping('Onion', 1, false)
 ];
  private cart: Cart[] = [];
  cartChanged = new Subject<Cart[]>();
  private openCloseElem = false;
  private price = 0;
  private button = true;
  private order = true;
  private timeOrder = false;
  private id: string;
  private cnt = 1;
  private editButton = false;
  private indexEditCart: number;
  private phoneUser: number;
  private emailUser: string;
  private userId: string;
  private numOrder: number;
  private typeOfOrder: string;
  private idBranch: number;
  private hour: number;
  private minute: number;
  private homeNumber: number;
  private street: string;

public getOiId = (oiId => {
  return new Promise((resolve, reject) => {
    resolve(oiId);
  });
});


public getOpenCloseElem() {
  return this.openCloseElem;
}

public setOpenCloseElem(openClose: boolean) {
  this.openCloseElem = openClose;
  return this.openCloseElem;
}

public setTimeBox() {
  this.timeOrder = !this.timeOrder;
}
public getTimeBox() {
  return this.timeOrder;
}

public setTimeOrder(hour: number, minute: number) {
  this.hour = hour;
  this.minute = minute;
}

public getTimeOrder() {
  console.log(this.hour + ':' + this.minute);
  return this.hour + ':' + this.minute;
}

  public setTypeOfOrder(typeOfOrder: string) {
    this.typeOfOrder = typeOfOrder;
  }

public getCnt() {
  return this.cnt++;
}

public setId(id: string) {
    this.id = id;
}

public getId() {
    return this.id;
}

  public getOrder() {
    return this.order;
  }



  public setOrder(order: boolean) {
    this.order = order;
  }

  public setCredential(id: string, phone: number, email: string) {
    this.userId = id;
    this.phoneUser = phone;
    this.emailUser = email;
  }

  public createUserId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  public getButton() {
     return  this.button;
  }

  public setButton(button: boolean) {
    this.button = !button;
  }
public getTopping() {
    return this.toppings.slice();
}

public addPrice(price: number) {
    this.price += price;
}

public decPrice(price: number) {
  this.price -= price;
}

public addItemCart(cart: Cart) {
  this.cart.push(cart);
  this.cartChanged.next(this.cart.slice());
  this.price += cart.price;
}

public getCart() {
    return this.cart.slice();
}

public setCartTopping(topping: Topping[]) {
  this.cart[this.getIndexEditCart()].topping = topping;
}

public getPrice() {
    return this.price;
}
public setDate() {
  const date = new Date();
  const y = date.getFullYear(); // year  yyyy
  const m = date.getMonth() + 1;  // month    mm
  const d = date.getDate();  // day        dd
  return y + '-' + m + '-' + d;

}

public setTime() {
  const time = new Date();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  return h + ':' + m + ':' + s;
}
/*
  deleteTopping(name: string) {
    for (const {item, index} of this.cart.map((item, index) => ({ item, index }))) {
      if (name === item.name) {
        this.cart.splice(index, 1);
        this.price -= item.price;
      }
    }
  }*/

  public DeleteItemCart(index: number) {
    this.cart[index].topping.forEach(item => {
      this.price -= item.price;
    });
    this.price -= this.cart[index].price;

    this.cart.splice(index, 1);

}

public getEditOrderTopping(index: number) {
  console.log( this.cart[index].topping);
  return  this.cart[index].topping.slice();
}


public resetSelectedTopping() {
  this.toppings.forEach((item)  => {
    item.selected = false;
  });
}

public setEditButton() {
  this.editButton = !this.editButton;
}

public getEditButton() {
  return this.editButton;
}

public setIndexEditCart(index: number) {
  this.indexEditCart = index;
}

public getIndexEditCart() {
  return this.indexEditCart;
}

public setdetailsDelivery(branchId: number, homenum: number, street: string ) {
  this.idBranch = branchId;
  this.homeNumber = homenum;
  this.street = street;
}

public createPost() {
  const post = {user_id: this.userId, email: this.emailUser, phone: this.phoneUser,
                street: this.street, homeNumber: this.homeNumber};
  this.http.post(BACKEND_URL + '/users', post).subscribe(responseData => {
    console.log(responseData);
  });
}

public setOrderToDb() {
  console.log(this.numOrder);
  const d = this.setDate();
  const t = this.setTime();
  console.log(d);
  const post = {user_id: this.userId,
                       num_order: this.numOrder,
                       branch: this.idBranch,
                       o_type: this.typeOfOrder,
                       time: t,
                       date: d,
                       price: this.price,
                       status: 'Process',
                       pick_time: this.getTimeOrder()
                        };
  this.http.post(BACKEND_URL + '/orders', post).subscribe(responseData => {
                          console.log(responseData);
                      });
                  }



public getNumOrder() {
  this.http.get(BACKEND_URL + '/num_order').subscribe(numOrder => {
   let x: any;

    for (x in numOrder) {
      console.log(numOrder[x].num_order);
      this.numOrder = numOrder[x].num_order;
      console.log(this.numOrder);
    }
    this.numOrder += 12;
    console.log(this.numOrder);

  });
}

public setOrderItemDb() {
let post: any;


for ( const x of this.cart) {
  let orderItemId: any;
  console.log('name:' + x.name);
  console.log('name:' + x.topping.length);

  post = {
      order_num: this.numOrder,
      name_id: x.name
    };
  this.http.post(BACKEND_URL + '/ordersItem', post).subscribe(async (res) => {

    orderItemId = await this.getOiId(res);
      // for (let x in res) {
      //   console.log(res[x].oi_id)
      // }
    console.log(orderItemId.oi_id);
    if (x.topping.length > 0) {
      for (const y of x.topping) {
        post = {
          oi_id: orderItemId.oi_id,
          name_id: x.name,
          topping_id: y.name
        };
        this.http.post(BACKEND_URL + '/pizzaOrder', post).subscribe(resu => {
          console.log(resu);
          });
      }

    }

    });
  console.log('im not unde!!!!' + orderItemId);



          }
}

}




