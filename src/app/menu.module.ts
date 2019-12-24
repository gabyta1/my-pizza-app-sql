import {Topping} from './topping.module';

export class Menu {

  public m_name: string;
  public m_description: string;
  public imagePathFront: string;
  public imagePathBack: string;
  public category: string;
  public price: number;


  constructor(name: string, description: string, imagePathFront: string, imagePathBack: string, category: string, price: number) {
    this.m_name = name;
    this.m_description = description;
    this.imagePathFront = imagePathFront;
    this.imagePathBack = imagePathBack;
    this.category = category;
    this.price = price;
  }

}
