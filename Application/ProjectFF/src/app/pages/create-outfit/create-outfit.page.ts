import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonModal,
  IonicModule,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Settings } from 'src/app/constants/constants';
import { WardrobeService } from 'src/app/services/wardrobe/wardrobe.service';
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';
import { take, tap } from 'rxjs';
import { Outfit } from 'src/app/models/outfit/outfit.model';
import { OutfitsService } from 'src/app/services/outfits/outfits.service';

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
  clothingItems: ClothingItem[] = [];
  selectedItems: ClothingItem[] = [];
  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor(
    private wardrobeService: WardrobeService,
    private loadingCtrl: LoadingController,
    private outfitsService: OutfitsService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.wardrobeService.wardrobe
      .pipe(
        take(1),
        tap((items) => {
          this.clothingItems = items;
        })
      )
      .subscribe();
    this.form = new FormGroup({
      outfitSetting: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      outfitName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }

  onAddClothingItem() {}

  onCreateNewOutfit() {
    console.log(this.form);
    console.log(this.selectedItems);
    const newOutfit = new Outfit(
      this.selectedItems,
      this.form.value.outfitName,
      this.form.value.outfitSetting,
      Math.random().toString(),
      new Date(),
      false
    );

    this.loadingCtrl
      .create({
        message: 'Adding Outfit to your wardrobe...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.outfitsService.addOutfit(newOutfit).subscribe((res) => {
          if (res) {
            this.toastCtrl
              .create({
                message: 'Outfit added Successfully!',
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
                message: 'Could not add Outfit!',
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

  cancelChanges() {
    this.modal.dismiss();
  }

  confirmChanges() {
    this.modal.dismiss();
  }

  trackItems(index: number, item: ClothingItem) {
    return item.id;
  }

  isChecked(value: string) {
    return this.selectedItems.find((item) => item.id === value);
  }

  checkboxChange(ev: any) {
    const { checked, value } = ev.detail;

    if (checked) {
      this.selectedItems = [...this.selectedItems, value];
    } else {
      this.selectedItems = this.selectedItems.filter(
        (item: any) => item.id !== value.id
      );
    }
  }
}
