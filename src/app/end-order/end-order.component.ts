import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-end-order',
  templateUrl: './end-order.component.html',
  styleUrls: ['./end-order.component.css']
})
export class EndOrderComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
    // setTimeout(() => {
    //   window.location.replace('home');
    // }, 5000);
  }

  toHome() {
    window.location.replace('home');
  }

}
