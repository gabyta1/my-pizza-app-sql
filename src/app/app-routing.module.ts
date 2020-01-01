import { HomeComponent } from './home/home.component';
import { DetailsOrdersComponent } from './manage/details-orders/details-orders.component';
import { AddMenuComponent } from './manage/manage-menu/add-menu/add-menu.component';
import { EditMenuComponent } from './manage/manage-menu/edit-menu/edit-menu.component';
import { ManageComponent } from './manage/manage.component';
import { PayComponent } from './pay/pay.component';
import { SummaryComponent } from './order/summary/summary.component';
import {RouterModule, Routes} from '@angular/router';
import {MealsComponent} from './meals/meals.component';
import {NgModule} from '@angular/core';
import {BranchComponent} from './branch/branch.component';
import {BranchStartComponent} from './branch/branch-start/branch-start.component';
import {MapComponent} from './branch/map/map.component';
import {MealMenusComponent} from './meals/meal-menus/meal-menus.component';
import {OrderComponent} from './order/order.component';
import {JobsComponent} from './jobs/jobs.component';
import {PickComponent} from './order/pick/pick.component';
import {ToppingsComponent} from './order/toppings/toppings.component';
import { ManageMenuComponent } from './manage/manage-menu/manage-menu.component';
import { DetailOrderComponent } from './manage/details-orders/detail-order/detail-order.component';



const appRouts: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'meals', component: MealsComponent, children: [
      {path: ':id', component: MealMenusComponent},

    ]},
  {path: 'stores', component: BranchComponent, children: [
      {path: '', component: BranchStartComponent},
      {path: ':id', component: MapComponent}


    ]},
  {path: 'order', component: OrderComponent, children: [
      {path: 'pick', component: PickComponent},
      {path: 'toppings', component: ToppingsComponent},
      {path: 'summary', component: SummaryComponent}
    ]},
    {path: 'payment-info' , component: PayComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'manage', component: ManageComponent, children: [
    {path: 'menu', component: ManageMenuComponent, children: [
      {path: 'edit', component: EditMenuComponent},
      {path: 'add-item', component: AddMenuComponent}
    ]},
    {path: 'details-orders', component: DetailsOrdersComponent, children: [
      {path: ':id', component: DetailOrderComponent}
    ]}
  ]}
  ];


@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
