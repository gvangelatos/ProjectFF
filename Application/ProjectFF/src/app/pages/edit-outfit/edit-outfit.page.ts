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
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';
import { Settings } from 'src/app/constants/constants';
import { WardrobeService } from 'src/app/services/wardrobe/wardrobe.service';
import { OutfitsService } from 'src/app/services/outfits/outfits.service';
import { Outfit } from 'src/app/models/outfit/outfit.model';
import { of, switchMap, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-outfit',
  templateUrl: './edit-outfit.page.html',
  styleUrls: ['./edit-outfit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class EditOutfitPage implements OnInit {
  form!: FormGroup;
  outfit?: Outfit;
  clothingSettings: string[] = Settings;
  clothingItems: ClothingItem[] = [];
  selectedItems: ClothingItem[] = [];
  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor(
    private wardrobeService: WardrobeService,
    private loadingCtrl: LoadingController,
    private outfitsService: OutfitsService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
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
    this.loadingCtrl
      .create({
        message: 'Fetching Outfit data...',
      })
      .then((loadingEl) => {
        loadingEl.present();

        this.activatedRoute?.paramMap
          ?.pipe(
            switchMap((paramMap) => {
              if (!paramMap?.has('outfitId')) {
                this.navCtrl.navigateBack('/home/tabs/feed');
              }
              return this.outfitsService.getOutfitById(
                <string>paramMap?.get('outfitId')
              );
            }),
            switchMap((outfits) => {
              if (!outfits.length) {
                this.navCtrl.navigateBack('/home/tabs/feed');
              }
              this.outfit = { ...outfits[0] };
              this.selectedItems = this.outfit?.items;
              this.form.patchValue({
                outfitSetting: this.outfit?.setting,
                outfitName: this.outfit?.name,
              });
              return this.wardrobeService.wardrobe;
            }),
            tap((clothingItems) => {
              this.clothingItems = clothingItems;
              loadingEl.dismiss();
            })
          )
          .subscribe();
      });
  }

  onAddClothingItem() {}

  onConfirmEditOutfit() {
    const newOutfit = new Outfit(
      this.selectedItems,
      this.form.value.outfitName,
      this.form.value.outfitSetting,
      this.outfit?.id ? this.outfit?.id : Math.random().toString(),
      this.outfit?.createdAt ? this.outfit?.createdAt : new Date(),
      !!this.outfit?.isFavorite
    );

    this.loadingCtrl
      .create({
        message: 'Editing Outfit...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.outfitsService.editOutfit(newOutfit).subscribe((res) => {
          if (res) {
            this.toastCtrl
              .create({
                message: 'Outfit edited Successfully!',
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
                message: 'Could not edit Outfit!',
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
