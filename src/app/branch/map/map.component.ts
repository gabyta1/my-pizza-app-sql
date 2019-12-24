import { Component, OnInit } from '@angular/core';
import {Stores} from '../../stores.module';
import {ActivatedRoute, Params} from '@angular/router';
import {BranchService} from '../branch.service';
import { DomSanitizer } from '@angular/platform-browser';
import {error} from '@angular/compiler/src/util';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  positionMap: Stores;
  id: number;


  constructor(private storeService: BranchService,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
       this.route.params.subscribe(
      (params: Params) =>  {
          this.id = +params['id'];
          this.positionMap = this.storeService.getStores(this.id);

      }

    );
  }

getUrl(positionMap: Stores) {

   return 'https://maps.google.com/maps?q=' + positionMap.street +
       '%20' + positionMap.num_street + '%20%' + positionMap.city + '&t=&z=20&ie=UTF8&iwloc=&output=embed';




}

}
