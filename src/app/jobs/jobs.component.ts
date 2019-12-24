import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    console.log(value);
    form.reset();
  }

}
