import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Menu} from '../menu.module';
import {Topping} from '../topping.module';
import {map} from 'rxjs/operators';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;
@Injectable()
export class MealsService {
  imagePathBack = 'assets/img/backImage.jpg';
  private menu: any = {};
  private order = false;
  private orderChoose: Menu;
  private topping: Topping[] = [];


  constructor(private http: HttpClient) { }







  // private menu: Menu[] = [new Menu('Single Pizza', 'Mozzarella | Tomatoes |\n' +
  //   'Toppings: 1$ for each', 'assets/img/pizza1.jpg', this.imagePathBack, 'pizza',
  //   10),
  //   new Menu('Neapolitan pizza', 'Mozzarella | Marinara Sauce | basil | Olive Oil\n' +
  //     'Toppings: 1$ for each', 'assets/img/pizza2.jpg',
  //     this.imagePathBack, 'pizza', 20),
  //   new Menu('Tuna', 'Tuna | Cream Cheese | Tomato,  | Pickles \n' +
  //     'Toppings: 1$ for each',
  //     'assets/img/tuna.jpg',
  //     this.imagePathBack, 'sandwich', 16),
  //   new Menu('Croissant', '', 'assets/img/Croissant.jpg',
  //     this.imagePathBack, 'pastry', 5),
  //   new Menu('Single Pizza', 'Mozzarella | Tomatoes |\n' +
  //     'Toppings: 1$ for each', 'assets/img/pizza1.jpg', this.imagePathBack, 'pizza', 10),
  //   new Menu( 'Coca Cola', '', 'assets/img/coca-cola.jpg',
  //      '', 'beverages', 5),
  //   new Menu ('Zero Cola', '', 'assets/img/cola-zero.jpg',
  //      '', 'beverages', 5),
  //   new Menu ('Neviot', '', 'assets/img/neviot.jpg',
  //     '', 'beverages', 5),
  //   new Menu ('Fuze Tea', '', 'assets/img/fuze-tea.png',
  //     '', 'beverages', 5),
  //   new Menu ('Sprite', '', 'assets/img/sprite.jpg',
  //     '', 'beverages', 5),
  //   new Menu ('Zero Sprite', '', 'assets/img/zero-sprite.jpg',
  //     '', 'beverages', 5),
    //   new Menu ('Fanta', '', 'assets/img/fanta.jpg',
    //     '', 'beverages', 5),
  //   new Menu ('Prigat', '', 'assets/img/prigat.jpg',
  //     '', 'beverages', 5)
  // ];



  public setOrderChoose(orderChoose: Menu) {
    this.orderChoose = orderChoose;
  }

  public getOrderChooseName() {
    return this.orderChoose.m_name;
  }
  public getOrderChoosePrice() {
    return this.orderChoose.price;
  }


  public getOrderChoose() {
    return this.orderChoose;
  }


  public getHttp() {
    this.http.get('/meals')
    .pipe(
      map(responseData => {
        console.log(responseData);
        for (const key in responseData) {     // change to array
          if (responseData.hasOwnProperty(key)) {
            this.menu.push({ ...responseData[key] });   // have a problem to write 'this' in ES6 function
          }
        }
        console.log(this.menu);
        return this.menu;

      })
    )
    .subscribe(posts => {
      // ...
      console.log(posts);
      return posts;
    });
  }





  public getMeal() {
  return  this.http.get(BACKEND_URL + '/meals')
    .pipe(
      map(responseData => {
        this.menu = [];
        console.log(responseData);
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.menu.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
          }
        }
        console.log(this.menu);
        return this.menu;
      })
    );

   // this.getHttp();
   // console.log( 'helloooo' + this.menu);
    //return this.menu.slice();
  }

  public getMenu() {
    return this.menu.slice();
  }

  public getMeals(index: number) {
    return this.menu.slice()[index];
  }
  public addTopping(topping: Topping) {
   this.topping.push(topping);
  }
  public decTopping(name: string) {
    for (const {item, index} of this.topping.map((item, index) => ({item, index}))) {
      if (name === item.name) {
        this.topping.splice(index, 1);
      }
    }
  }

  public resetTopping() {
   return  this.topping = [];
  }

  public getTopping() {
    return this.topping.slice();
  }





  public setOrder(order: boolean) {
        this.order = order;
  }

  public getOrder() {
    return this.order;
  }

}


