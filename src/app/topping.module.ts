export class Topping {
  public name: string = null;
  public price: number;
  public selected: boolean;

  constructor(name: string, price: number, selected: boolean) {
    this.name = name;
    this.price = price;
    this.selected = selected;
  }
}
