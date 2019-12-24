import {Topping} from './topping.module';

export class Cart {
  public name: string;
  public price: number;
  public topping: Topping[];
  public cnt: number;

  constructor(name: string, price: number, topping: Topping[], cnt: number) {
    this.name = name;
    this.price = price;
    this.topping = topping;
    this.cnt = cnt;
  }
}

