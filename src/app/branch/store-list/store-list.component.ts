import { Component, OnInit } from '@angular/core';
import {Stores} from '../../stores.module';
import {BranchService} from '../branch.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
   stores: Stores[];

  constructor(private stService: BranchService) {

  }

  ngOnInit() {
  this.stService.getStoreDb().subscribe((res) => {
    this.stores = res;
  });
}
}
