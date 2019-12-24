import { Component, OnInit } from '@angular/core';
import {MealsService} from '../meals/meals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public mealService: MealsService) { }

  ngOnInit() {
  }

}
