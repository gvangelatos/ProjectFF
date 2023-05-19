import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActionSheetController,
  IonItemSliding,
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';
import { WardrobeService } from 'src/app/services/wardrobe/wardrobe.service';
import { Outfit } from 'src/app/models/outfit/outfit.model';
import { OutfitsService } from 'src/app/services/outfits/outfits.service';
import { FilteredClothingItem } from 'src/app/models/filtered-clothing-items/filtered-clothing-items.model';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.page.html',
  styleUrls: ['./wardrobe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WardrobePage implements OnInit {
  clothingItems: ClothingItem[] = [];
  loadingWardrobe: boolean = true;
  loadingOutfits: boolean = true;
  loadingFilteredWardrobe: boolean = true;
  outfits: Outfit[] = [];
  filteredClothingItems: FilteredClothingItem[] = [];
  displayingFilter: 'all' | 'type' | 'setting' | 'color' | 'favorites' = 'all';
  filter: 'wardrobe' | 'outfit' = 'wardrobe';
  private _subscriptions: Subscription[] = [];

  constructor(
    private wardrobeService: WardrobeService,
    private outfitsService: OutfitsService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this._subscriptions.push(
      this.wardrobeService.wardrobe.subscribe((items) => {
        this.clothingItems = items;
        if (this.loadingWardrobe) this.loadingWardrobe = false;
      })
    );

    this._subscriptions.push(
      this.outfitsService.outfits.subscribe((outfits) => {
        this.outfits = outfits;
        if (this.loadingOutfits) this.loadingOutfits = false;
      })
    );

    this._subscriptions.push(
      this.wardrobeService.wardrobeFiltered.subscribe((items) => {
        this.filteredClothingItems = items;
        if (this.loadingFilteredWardrobe) this.loadingFilteredWardrobe = false;
      })
    );
  }

  onFilterChange(
    activatedFilter: 'all' | 'favorites' | 'type' | 'setting' | 'color'
  ) {
    // this.displayingFilter = activatedFilter;
    switch (activatedFilter) {
      case 'favorites':
        this.displayingFilter = activatedFilter;
        break;
      case 'all':
        this.displayingFilter = activatedFilter;
        break;

      default:
        this.displayingFilter = activatedFilter;
        this.filteredClothingItems = [];
        this.loadingFilteredWardrobe = true;
        this.wardrobeService
          .getFilteredWardrobe(activatedFilter)
          .subscribe((res) => {});
        break;
    }
  }

  onFilterUpdate(event: any) {
    this.onFilterChange('all');
    if (event.detail.value === 'wardrobe') {
      this.filter = 'wardrobe';
    } else {
      this.filter = 'outfit';
    }
  }

  ondeleteClothingItemSlide(
    event: any,
    clothingItemId: string,
    slidingEl: IonItemSliding
  ) {
    slidingEl.close();
    this.ondeleteClothingItem(clothingItemId, slidingEl);
  }

  ondeleteOutfitSlide(event: any, outfitId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.ondeleteOutfit(outfitId, slidingEl);
  }

  onEditClothingItemSlide(
    event: any,
    clothingItemId: string,
    slidingEl: IonItemSliding
  ) {
    slidingEl.close();
    this.onEditClothingItem(clothingItemId, slidingEl);
  }

  onEditOutfitSlide(event: any, outfitId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.onEditOutfit(outfitId, slidingEl);
  }

  onEditClothingItem(clothingItemId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Editing Item...' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
        }, 800);
      });
  }

  onEditOutfit(outfitId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Editing Outfit...' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
        }, 800);
      });
  }

  onAddToOutfit(clothingItemId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Adding to Outfit..' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
        }, 800);
      });
  }

  onOutfitToggleFavorites(outfitId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Adding Outfit to Favorites..' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
        }, 800);
      });
  }

  ondeleteClothingItem(clothingItemId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.actionSheetCtrl
      .create({
        header: 'Are you sure you want to delete this item?',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.loadingCtrl
                .create({ message: 'Deleting Item...' })
                .then((loadingEl) => {
                  loadingEl.present();
                  this.loadingWardrobe = true;
                  this.clothingItems = [];
                  this.wardrobeService
                    .deleteClothingItem(clothingItemId)
                    .subscribe((res) => {
                      this.filteredClothingItems = [];
                      this.loadingFilteredWardrobe = true;
                      this.wardrobeService
                        .getFilteredWardrobe(this.displayingFilter)
                        .subscribe((res) => {});
                      loadingEl.dismiss();
                      this.presentToast(
                        'bottom',
                        res ? 'Deleted Succesfully!' : 'Could not Delete!',
                        res
                          ? 'checkmark-circle-outline'
                          : 'close-circle-outline',
                        res ? 'success' : 'danger'
                      );
                    });
                });
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  ondeleteOutfit(outfitId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.actionSheetCtrl
      .create({
        header: 'Are you sure you want to delete this outfit?',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.loadingCtrl
                .create({ message: 'Deleting Outfit...' })
                .then((loadingEl) => {
                  loadingEl.present();
                  this.loadingOutfits = true;
                  this.outfits = [];
                  this.outfitsService
                    .deleteOutfit(outfitId)
                    .subscribe((res) => {
                      loadingEl.dismiss();
                      this.presentToast(
                        'bottom',
                        res ? 'Deleted Succesfully!' : 'Could not Delete!',
                        res
                          ? 'checkmark-circle-outline'
                          : 'close-circle-outline',
                        res ? 'success' : 'danger'
                      );
                    });
                });
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    message: string,
    icon?: string,
    color?: string
  ) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon,
      color: color,
    });

    await toast.present();
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
