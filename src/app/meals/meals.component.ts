import { BranchService } from './../branch/branch.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {


  constructor(private stService: BranchService) { }

  ngOnInit() {
    this.stService.getStoreDb().subscribe((res) => {
      console.log(res);
  })

}
}
