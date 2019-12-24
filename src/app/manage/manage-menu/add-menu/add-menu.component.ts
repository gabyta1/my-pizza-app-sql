import { Router } from '@angular/router';
import { ManageService } from './../../manage.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  item: any = {m_name: '' , m_description: '' ,
               price: 0, catagory: '', imagePathFront: '',  imagePathBack: ''};
  fileFrontImage: any;
  fileBackImage: any;
  replaceFileFrontImage: string;
  replaceFileBackImage: string;
  category = ['pizza', 'sandwich', 'pastry', 'beverages', 'topping'];

  constructor(public manageService: ManageService, private router: Router) { }

  ngOnInit() {
  }

  onAddItem(f: NgForm) {
    if (this.fileFrontImage && this.fileBackImage) {
      this.replaceFileFrontImage = this.fileFrontImage.replace('C:\\fakepath\\', 'assets/img/');
      this.replaceFileBackImage = this.fileBackImage.replace('C:\\fakepath\\', 'assets/img/');
      this.item.imagePathFront = this.replaceFileFrontImage;
      this.item.imagePathBack = this.replaceFileBackImage;
    } else if (this.fileFrontImage) {
      this.replaceFileFrontImage = this.fileFrontImage.replace('C:\\fakepath\\', 'assets/img/');
      this.item.imagePathFront = this.replaceFileFrontImage;
    } else if (this.fileBackImage) {
      this.replaceFileBackImage = this.fileBackImage.replace('C:\\fakepath\\', 'assets/img/');
      this.item.imagePathBack = this.replaceFileBackImage;
    }
    this.manageService.addItem(this.item);
    console.log(this.item);
    this.manageService.setTable(this.manageService.getTable());
    this.router.navigate(['manage/menu']);

  }

  backTable() {
    this.manageService.setTable(this.manageService.getTable());
    this.router.navigate(['manage/menu']);

  }
}
