import { Component, OnDestroy, OnInit } from '@angular/core';
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
  Settings,
  UndergarmentsSubTypes,
} from 'src/app/constants/constants';
import { WardrobeService } from 'src/app/services/wardrobe/wardrobe.service';
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-clothing-item',
  templateUrl: './edit-clothing-item.page.html',
  styleUrls: ['./edit-clothing-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class EditClothingItemPage implements OnInit, OnDestroy {
  clothingItem: ClothingItem | undefined;
  form!: FormGroup;
  clothingTypes: string[] = ClothingTypes;
  clothingSubTypes: string[] = ClothingSubTypes;
  accessoriesSubTypes: string[] = AccessoriesSubTypes;
  footwearSubTypes: string[] = FootwearSubTypes;
  undergarmentsSubTypes: string[] = UndergarmentsSubTypes;
  clothingSettings: string[] = Settings;
  otherSubTypes: string[] = ['Other'];
  private _subscriptions: Subscription[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private wardrobeService: WardrobeService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
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
    this._subscriptions.push(
      this.activatedRoute?.paramMap?.subscribe((paramMap) => {
        if (!paramMap?.has('clothingItemId')) {
          this.navCtrl.navigateBack('/home/tabs/feed');
          return;
        }
        this.loadingCtrl
          .create({
            message: 'Fetching Item data...',
          })
          .then((loadingEl) => {
            loadingEl.present();
            this.wardrobeService
              .getClothingItemsById(<string>paramMap?.get('clothingItemId'))
              .subscribe((itemArray) => {
                if (!itemArray || !itemArray.length) {
                  this.navCtrl.navigateBack('/wardrobe');
                }
                this.clothingItem = itemArray[0];
                this.form.patchValue({
                  clothingSetting: this.clothingItem.setting,
                  clothingType: this.clothingItem.type,
                  clothingSubType: this.clothingItem.subType,
                  imageUrl: this.clothingItem.imageUrl,
                  color: this.clothingItem.color,
                });
                loadingEl.dismiss();
              });
          });
      })
    );
  }

  onCreateClothingItem() {
    const newClothingItem = new ClothingItem(
      this.form.value.clothingSetting,
      this.form.value.clothingType,
      this.form.value.clothingSubType,
      this.form.value.imageUrl,
      <string>this.clothingItem?.id,
      this.form.value.color
    );

    this.loadingCtrl
      .create({
        message: 'UpdatingItem...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.wardrobeService
          .updateClothingItem(newClothingItem)
          .subscribe((res) => {
            if (res) {
              this.toastCtrl
                .create({
                  message: 'Item updated Successfully!',
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
                  message: 'Cold not update item!',
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

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
