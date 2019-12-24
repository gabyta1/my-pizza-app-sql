import {Component, Input, OnInit} from '@angular/core';
import {Stores} from '../../../stores.module';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.css']
})
export class StoreItemComponent implements OnInit {
@Input() store: Stores;
@Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
