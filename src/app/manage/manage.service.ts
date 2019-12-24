import { MealsService } from './../meals/meals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
 private editItem: any;
 private table = true;
 private allOrders: any = {};
 private order: any = {};
 private topping: any = {};
 private numBySearchOrder: any = {};

  constructor(private http: HttpClient) { }



public setEditItem(editItem: any) {
  this.editItem = editItem;
}
public getEditItem() {
  return this.editItem;
}

public getTable() {
  return this.table;
}

public setTable(table: boolean) {
  this.table = !table;
}

public getOrder() {
  return this.order;
}

  public deleteItem(name: string, menus: any, menuId: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('/deleteItemMenu/' + menuId).subscribe(() => {
      const updateMenu = menus.filter (menu => menu.menu_id !== menuId);
      resolve(updateMenu);
    });

    });

  }

  public editItemDb(item: any) {
        this.http.patch('/editItemMenu', item).subscribe((res) => {
              console.log(res);
        });
  }

  public addItem(item: any) {
    this.http.post('/add-item', item).subscribe((res) => {
      console.log(res);
    });
  }

  public getOrderDetails() {
    return this.http.get('/order-details').pipe(
      map(responseData => {
        this.allOrders = [];
        console.log(responseData);
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.allOrders.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
          }
        }
        console.log(this.allOrders);
        return this.allOrders;
      })
    );
  }

  public getOrderDetail(id: number) {
    return this.http.get('/order-details/' + id).pipe(
      map(responseData => {
        this.order = [];
        console.log(responseData);
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.order.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
          }
        }
        console.log(this.order);
        return this.order;
      })
    );
  }

  public getToppingOrderDb(id: number) {
    return this.http.get('/order-topping/' + id).pipe(
      map(responseData => {
        this.topping = [];
        console.log(responseData);
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.topping.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
          }
        }
        console.log(this.topping);
        return this.topping;
      })
    );
  }

updateStatus(uStatus: string , uNumOrder: number) {
  const updateStatus = {status: uStatus, numOrder: uNumOrder };
  this.http.patch('/update-status', updateStatus).subscribe(res => {
    console.log(res);
  });
}

searchNumOrder(num: number) {
  return this.http.get('/searchNumOrder/' + num ).pipe(
    map(responseData => {
      this.numBySearchOrder = [];
      console.log(responseData);
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          this.numBySearchOrder.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
        }
      }
      console.log(this.numBySearchOrder);
      return this.numBySearchOrder;
    })
  );
}

// filterStatus(status: string) {
//   console.log(status);
//   return this.http.get('http://localhost:3000/filterStatus/' + status).pipe(
//     map(responseData => {
//       this.numBySearchOrder = [];
//       console.log(responseData);
//       for (const key in responseData) {
//         if (responseData.hasOwnProperty(key)) {
//           this.numBySearchOrder.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
//         }
//       }
//       console.log(this.numBySearchOrder);
//       return this.numBySearchOrder;
//     })
//   );
// }

getCustomDate(date: string) {
  if (date === undefined ) {
    return '';
  } else {
  const month = date.substr(6, 2);
  const day = date.substr(9, 2);
  const dayAfterChange  = +day + 1;
  const year = date.substr(1, 4);
  console.log(month + ' ' + day + ' ' + year);
  return year + '-' + month + '-' + dayAfterChange;
  }

}

filterOrderDataByStatus(status: string, fromDate: string, toDate: string) {
  return this.http.get('/filterOrderDataByStatus/' + status + '?fromDate=' + fromDate + '&toDate=' + toDate).pipe(
    map(responseData => {
      this.numBySearchOrder = [];
      console.log(responseData);
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          this.numBySearchOrder.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
        }
      }
      console.log(this.numBySearchOrder);
      return this.numBySearchOrder;
    })
  );
}

filterOrderDataByType(type: string, fromDate: string, toDate: string) {
  return this.http.get('/filterOrderDataByType/' + type + '?fromDate=' + fromDate + '&toDate=' + toDate).pipe(
    map(responseData => {
      this.numBySearchOrder = [];
      console.log(responseData);
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          this.numBySearchOrder.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
        }
      }
      console.log(this.numBySearchOrder);
      return this.numBySearchOrder;
    })
  );
}
filterOrderData(status: string, type: string, fromDate: string, toDate: string) {
  return this.http.get('/filterOrderData/' + status + '?fromDate=' + fromDate + '&toDate=' + toDate +
                     '&type=' + type).pipe(
    map(responseData => {
      this.numBySearchOrder = [];
      console.log(responseData);
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          this.numBySearchOrder.push({ ...responseData[key]});   // have a problem to write 'this' in ES6 function
        }
      }
      console.log(this.numBySearchOrder);
      return this.numBySearchOrder;
    })
  );
}

}
