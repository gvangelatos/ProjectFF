import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-outfit',
  templateUrl: './edit-outfit.page.html',
  styleUrls: ['./edit-outfit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditOutfitPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
