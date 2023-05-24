import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonicModule,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import {
  AccessoriesSubTypes,
  ClothingSubTypes,
  ClothingTypes,
  FootwearSubTypes,
  UndergarmentsSubTypes,
} from 'src/app/constants/constants';
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';
import { Settings } from 'src/app/constants/constants';
import { WardrobeService } from 'src/app/services/wardrobe/wardrobe.service';

@Component({
  selector: 'app-create-clothing-item',
  templateUrl: './create-clothing-item.page.html',
  styleUrls: ['./create-clothing-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreateClothingItemPage implements OnInit {
  form!: FormGroup;
  clothingTypes: string[] = ClothingTypes;
  clothingSubTypes: string[] = ClothingSubTypes;
  accessoriesSubTypes: string[] = AccessoriesSubTypes;
  footwearSubTypes: string[] = FootwearSubTypes;
  undergarmentsSubTypes: string[] = UndergarmentsSubTypes;
  clothingSettings: string[] = Settings;
  otherSubTypes: string[] = ['Other'];

  constructor(
    private loadingCtrl: LoadingController,
    private wardrobeService: WardrobeService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      clothingSetting: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      clothingType: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      clothingSubType: new FormControl(null, {
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
      isFavorite: new FormControl(null, {
        updateOn: 'change',
        validators: [],
      }),
    });
  }

  onCreateClothingItem() {
    console.log(this.form);
    const newClothingItem = new ClothingItem(
      this.form.value.clothingSetting,
      this.form.value.clothingType,
      this.form.value.clothingSubType,
      this.form.value.imageUrl,
      Math.random().toString(),
      this.form.value.color
    );

    this.loadingCtrl
      .create({
        message: 'Adding Item to your wardrobe...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.wardrobeService
          .addClothingItem(newClothingItem)
          .subscribe((res) => {
            if (res) {
              this.toastCtrl
                .create({
                  message: 'Item added Successfully!',
                  duration: 1500,
                  position: 'bottom',
                  icon: 'checkmark-circle-outline',
                  color: 'success',
                })
                .then((toastEl) => {
                  toastEl.present();
                  loadingEl.dismiss();
                  this.navCtrl.navigateBack('/wardrobe');
                });
            } else {
              this.toastCtrl
                .create({
                  message: 'Cold not add item!',
                  duration: 1500,
                  position: 'bottom',
                  icon: 'close-circle-outline',
                  color: 'danger',
                })
                .then((toastEl) => {
                  toastEl.present();
                });
            }
          });
      });
  }
}
