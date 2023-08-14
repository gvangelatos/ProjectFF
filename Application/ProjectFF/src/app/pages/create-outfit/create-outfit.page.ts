import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Settings } from 'src/app/constants/constants';

@Component({
  selector: 'app-create-outfit',
  templateUrl: './create-outfit.page.html',
  styleUrls: ['./create-outfit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreateOutfitPage implements OnInit {
  form!: FormGroup;
  clothingSettings: string[] = Settings;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      clothingSetting: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      color: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      imageUrl: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }
}
