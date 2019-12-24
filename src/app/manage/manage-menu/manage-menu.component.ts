import { NgForm } from '@angular/forms';
import { ManageService } from './../manage.service';
import { Component, OnInit } from '@angular/core';
import { MealsService } from 'src/app/meals/meals.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent implements OnInit {
  menus: any = {};
  item: any;

  constructor(private mlservice: MealsService, public manageService: ManageService, private router: Router) { }

  ngOnInit() {
    this.menus = this.mlservice.getMenu();
  }

  EditItem(i: number) {
    this.item = this.mlservice.getMeals(i);
    this.manageService.setEditItem(this.item);
    this.manageService.setTable(this.manageService.getTable());
    this.router.navigate(['manage/menu/edit']);
  }


    async DeleteItem(i: number, name: string, menuId: number) {
    if (confirm('Are you sure to delete ' + name)) {
        console.log(name);
        this.menus =  await this.manageService.deleteItem(name, this.menus, menuId);

    }
    this.item = this.mlservice.getMeals(i);
    console.log(this.item);
  }

  addItem() {
    this.manageService.setTable(this.manageService.getTable());
    this.router.navigate(['manage/menu/add-item']);
  }


}
