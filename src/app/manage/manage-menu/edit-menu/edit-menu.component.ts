import { ManageService } from './../../manage.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  item: any = {m_name: '', m_description: '' , price: 0, menu_id: 0, catagory: '', imagePathFront: '',  imagePathBack: ''};
  fileFrontImage: any;
  fileBackImage: any;
  replaceFileFrontImage: string;
  replaceFileBackImage: string;
  category = ['pizza', 'sandwich', 'pastry', 'beverages', 'topping'];
  constructor(private manageService: ManageService, private router: Router) { }

  ngOnInit() {
   this.item = this.manageService.getEditItem();
  }

  onEditItem(f: NgForm) {
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
    this.manageService.editItemDb(this.item);
    this.manageService.setTable(this.manageService.getTable());
    this.router.navigate(['/manage/menu']);

  }
  backTable() {
    this.manageService.setTable(this.manageService.getTable());
    this.router.navigate(['manage/menu']);

  }

}
