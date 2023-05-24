import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-clothing-item',
  templateUrl: './edit-clothing-item.page.html',
  styleUrls: ['./edit-clothing-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditClothingItemPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
