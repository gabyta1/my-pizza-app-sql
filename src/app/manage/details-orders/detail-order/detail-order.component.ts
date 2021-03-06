import { ManageService } from './../../manage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  numOrder: number;
  order: any;
  topping: any;
  constructor(private route: ActivatedRoute, private manageService: ManageService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
     this.numOrder = params['id'];
   });
    this.manageService.getOrderDetail(this.numOrder).subscribe((res) => {
      this.order = res;
  });
    this.manageService.getToppingOrderDb(this.numOrder).subscribe((res) => {
    this.topping = res;
  });
  }

  backDetails() {
    this.manageService.setTable(this.manageService.getTable());
    this.router.navigate(['/manage/details-orders']);
  }

}
