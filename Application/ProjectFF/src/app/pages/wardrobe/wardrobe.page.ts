import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActionSheetController,
  AlertController,
  IonItemSliding,
  IonicModule,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';
import { WardrobeService } from 'src/app/services/wardrobe/wardrobe.service';
import { Outfit } from 'src/app/models/outfit/outfit.model';
import { OutfitsService } from 'src/app/services/outfits/outfits.service';
import { FilteredClothingItem } from 'src/app/models/filtered-clothing-items/filtered-clothing-items.model';
import { FilteredOutfitItem } from 'src/app/models/filtered-outfit-item/filtered-outfit-item.model';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.page.html',
  styleUrls: ['./wardrobe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WardrobePage implements OnInit, OnDestroy {
  clothingItems: ClothingItem[] = [];
  loadingWardrobe: boolean = true;
  loadingOutfits: boolean = true;
  loadingFilteredOutfits: boolean = true;
  loadingFilteredWardrobe: boolean = true;
  searchingOutfits: boolean = false;
  searchQuery: string = '';
  outfits: Outfit[] = [];
  outfitsFilteredSearch: Outfit[] = [];
  filteredClothingItems: FilteredClothingItem[] = [];
  filteredOutfits: FilteredOutfitItem[] = [];
  displayingFilter:
    | 'all'
    | 'type'
    | 'setting'
    | 'color'
    | 'favorites'
    | 'itemsNumber' = 'all';
  filter: 'wardrobe' | 'outfit' = 'wardrobe';
  private _subscriptions: Subscription[] = [];

  constructor(
    private wardrobeService: WardrobeService,
    private outfitsService: OutfitsService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
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

    this._subscriptions.push(
      this.outfitsService.filteredOutfits.subscribe((items) => {
        this.filteredOutfits = items;
        if (this.loadingFilteredOutfits) this.loadingFilteredOutfits = false;
      })
    );
  }

  onFilterChange(
    activatedFilter:
      | 'all'
      | 'favorites'
      | 'type'
      | 'setting'
      | 'color'
      | 'itemsNumber'
  ) {
    // this.displayingFilter = activatedFilter;
    switch (activatedFilter) {
      case 'favorites':
        this.displayingFilter = activatedFilter;
        this.filteredOutfits = [];
        this.loadingFilteredOutfits = true;
        this.outfitsService
          .getFilteredOutfits(activatedFilter)
          .subscribe((res) => {});
        break;
      case 'all':
        this.displayingFilter = activatedFilter;
        break;
      case 'itemsNumber':
        this.displayingFilter = activatedFilter;
        this.filteredOutfits = [];
        this.loadingFilteredOutfits = true;
        this.outfitsService
          .getFilteredOutfits(activatedFilter)
          .subscribe((res) => {});
        break;
      case 'setting':
        if (this.filter == 'outfit') {
          this.displayingFilter = activatedFilter;
          this.filteredOutfits = [];
          this.loadingFilteredOutfits = true;
          this.outfitsService
            .getFilteredOutfits(activatedFilter)
            .subscribe((res) => {});
        } else if (this.filter === 'wardrobe') {
          this.displayingFilter = activatedFilter;
          this.filteredClothingItems = [];
          this.loadingFilteredWardrobe = true;
          this.wardrobeService
            .getFilteredWardrobe(activatedFilter)
            .subscribe((res) => {});
        }
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
    this.navCtrl.navigateForward([
      '/wardrobe/clothing-items/edit/',
      clothingItemId,
    ]);
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

  onOutfitToggleFavorites(outfit: Outfit, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.alertCtrl
      .create({
        header: outfit?.isFavorite
          ? 'Remove from Favorites?'
          : 'Add to Favorites?',
        subHeader: outfit?.isFavorite
          ? 'Do you want to remove this outfit from your favorites?'
          : 'Do you want to add this outfit to your favorites?',
        buttons: [
          {
            text: 'Cancel',
            role: 'Cancel',
          },
          {
            text: outfit?.isFavorite ? 'Remove it!' : 'Add it!',
            role: 'confirm',
            handler: () => {
              this.loadingCtrl
                .create({
                  message: outfit?.isFavorite
                    ? 'Removing from Favorites...'
                    : 'Adding to Favorites...',
                })
                .then((loadingEl) => {
                  loadingEl.present();
                  this.outfitsService
                    .toggleOutfitFavorite(outfit?.id)
                    .subscribe((res) => {
                      if (this.displayingFilter !== 'all') {
                        this.filteredOutfits = [];
                        this.loadingFilteredOutfits = true;
                        this.outfitsService
                          .getFilteredOutfits(this.displayingFilter)
                          .subscribe((res2) => {
                            loadingEl.dismiss();
                            if (res2) {
                              this.presentToast(
                                'bottom',
                                outfit.isFavorite
                                  ? 'Removed Succesfully!'
                                  : 'Added Succesfully!',
                                'checkmark-circle-outline',
                                'success'
                              );
                            } else {
                              loadingEl.dismiss();
                              this.presentToast(
                                'bottom',
                                outfit?.isFavorite
                                  ? 'Could not Remove to Favorites'
                                  : 'Could not Add to Favorites',
                                'close-circle-outline',
                                'danger'
                              );
                            }
                          });
                      } else {
                        loadingEl.dismiss();
                        if (res) {
                          this.presentToast(
                            'bottom',
                            outfit.isFavorite
                              ? 'Removed Succesfully!'
                              : 'Added Succesfully!',
                            'checkmark-circle-outline',
                            'success'
                          );
                        } else {
                          loadingEl.dismiss();
                          this.presentToast(
                            'bottom',
                            outfit?.isFavorite
                              ? 'Could not Remove to Favorites'
                              : 'Could not Add to Favorites',
                            'close-circle-outline',
                            'danger'
                          );
                        }
                      }
                    });
                });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
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
                      this.filteredOutfits = [];
                      this.loadingFilteredOutfits = true;
                      this.outfitsService
                        .getFilteredOutfits(this.displayingFilter)
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

  handleSearchInput(event: any) {
    this.searchingOutfits = true;
    this.searchQuery = event.target.value.toLowerCase().trim();
    this.outfitsFilteredSearch = [
      ...this.outfits.filter((outfit) => {
        return outfit.name.toLowerCase().indexOf(this.searchQuery) > -1;
      }),
    ];
    this.searchingOutfits = false;
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

  onAddClicked() {
    this.displayingFilter = 'all';
    if (this.filter === 'wardrobe') {
      this.navCtrl.navigateForward('/wardrobe/clothing-items/new');
    } else {
      this.navCtrl.navigateForward('/wardrobe/outfit/new');
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
