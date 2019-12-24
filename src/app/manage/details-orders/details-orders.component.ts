import { Router } from '@angular/router';
import { ManageService } from './../manage.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDatepickerIntl, MatDatepicker } from '@angular/material/datepicker';



@Component({
  selector: 'app-details-orders',
  templateUrl: './details-orders.component.html',
  styleUrls: ['./details-orders.component.css']
})
export class DetailsOrdersComponent implements OnInit {
orders: any = [];
status = [ 'Done', 'Process', 'Canceled'];
search = null;
backAllOrder = false;
filter = 'Filter Status';
fromDate: any;
toDate: any;
filterType = 'Filter Type';

  constructor(public manageService: ManageService, private router: Router, public date: MatDatepickerIntl) { }

  ngOnInit() {
    this.manageService.getOrderDetails().subscribe(res => {
      this.orders = res;
      console.log(this.orders);
      this.manageService.setTable(false);

    });
  }

  detailOrder(numOrder: number) {
    this.manageService.setTable(this.manageService.getTable());
    this.router.navigate(['manage/details-orders/' + numOrder ]);
  }

  updateStatus(status: string, numOrder: number) {
    this.manageService.updateStatus(status, numOrder);
  }

  backDetails() {
     this.backAllOrder = !this.backAllOrder;
     this.manageService.getOrderDetails().subscribe(res => {
      this.orders = res;
    });
     this.search = null;
  }

  // filterStatus() {
  //   this.backAllOrder = !this.backAllOrder;
  //   this.manageService.filterStatus(this.filter).subscribe(res => {
  //      this.orders = res;
  //    });
  //   console.log(this.fromDate);
  // }

  filterData() {
   this.backAllOrder = true;
   this.fromDate = JSON.stringify(this.fromDate);
   this.toDate = JSON.stringify(this.toDate);
   this.fromDate = this.manageService.getCustomDate(this.fromDate);
   this.toDate = this.manageService.getCustomDate(this.toDate);
   if (this.fromDate === '' && this.toDate === '') {
     this.fromDate = '2018-1-1';
     this.toDate = '2030-1-1';
   }
   if (this.filter === 'Filter Status' && this.filterType !== 'Filter Type' ) {
     this.manageService.filterOrderDataByType(this.filterType,this.fromDate,this.toDate).subscribe(res => {
      this.orders = res;
    });
   } else if (this.filter !== 'Filter Status' && this.filterType === 'Filter Type') {
   this.manageService.filterOrderDataByStatus(this.filter, this.fromDate, this.toDate).subscribe(res => {
    this.orders = res;
     });
  } else if (this.filter !== 'Filter Status' && this.filterType !== 'Filter Type') {
      this.manageService.filterOrderData(this.filter, this.filterType, this.fromDate, this.toDate).subscribe(res => {
        this.orders = res;
      });
  }
   if (this.fromDate === '2018-1-1' && this.toDate === '2030-1-1') {
    this.fromDate = undefined;
    this.toDate = undefined;
  }

  }



}
