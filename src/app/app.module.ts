import { HomeComponent } from './home/home.component';
import { DetailsOrdersComponent } from './manage/details-orders/details-orders.component';
import { AddMenuComponent } from './manage/manage-menu/add-menu/add-menu.component';

import { EditMenuComponent } from './manage/manage-menu/edit-menu/edit-menu.component';
import { ManageMenuComponent } from './manage/manage-menu/manage-menu.component';
import { ManageComponent } from './manage/manage.component';
import { TimepickerComponent } from './order/pick/timepicker/timepicker.component';
import { PayComponent } from './pay/pay.component';
import { SummaryComponent } from './order/summary/summary.component';
import { ButtonToppingDirective } from './shared/button-topping.directive';
import { ListsComponent } from './order/lists/lists.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BranchComponent } from './branch/branch.component';
import { HeaderComponent } from './header/header.component';
import { JobsComponent } from './jobs/jobs.component';
import { OrderComponent } from './order/order.component';
import { MealsComponent } from './meals/meals.component';
import {MealMenusComponent} from './meals/meal-menus/meal-menus.component';
import {AppRoutingModule} from './app-routing.module';
import {BranchStartComponent} from './branch/branch-start/branch-start.component';
import {StoreListComponent} from './branch/store-list/store-list.component';
import {StoreItemComponent} from './branch/store-list/store-item/store-item.component';
import {MapComponent} from './branch/map/map.component';
import {BranchService} from './branch/branch.service';
import {MealsMainComponent} from './meals/meals-main/meals-main.component';
import {MealItemComponent} from './meals/meal-menus/meal-item/meal-item.component';
import {MealsService} from './meals/meals.service';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from './shared/button.directive';
import {OrderService} from './order/order.service';
import {ButtonComponent} from './order/button/button.component';
import {BoxCartDirective} from './shared/box-cart.directive';
import {SelectDirective} from './shared/select.directive';
import {PickComponent} from './order/pick/pick.component';
import {ToppingsComponent} from './order/toppings/toppings.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DetailOrderComponent } from './manage/details-orders/detail-order/detail-order.component';
import { FilterPipe } from './filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';














@NgModule({
  declarations: [
    AppComponent,
    BranchComponent,
    HeaderComponent,
    JobsComponent,
    OrderComponent,
    MealsComponent,
    MealMenusComponent,
    BranchStartComponent,
    StoreListComponent,
    StoreItemComponent,
    MapComponent,
    MealsMainComponent,
    MealItemComponent,
    ButtonDirective,
    ButtonComponent,
    BoxCartDirective,
    SelectDirective,
    PickComponent,
    ToppingsComponent,
    ListsComponent,
    ButtonToppingDirective,
    SummaryComponent,
    PayComponent,
    TimepickerComponent,
    DropdownDirective,
    ManageComponent,
    ManageMenuComponent,
    EditMenuComponent,
    AddMenuComponent,
    DetailsOrdersComponent,
    DetailOrderComponent,
    FilterPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    TooltipModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [BranchService, MealsService, OrderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
