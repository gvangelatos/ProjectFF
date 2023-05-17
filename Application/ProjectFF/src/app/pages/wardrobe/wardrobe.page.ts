import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItemSliding, IonicModule, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';
import { WardrobeService } from 'src/app/services/wardrobe/wardrobe.service';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.page.html',
  styleUrls: ['./wardrobe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WardrobePage implements OnInit {
  clothingItems: ClothingItem[] = [];
  displayAll: boolean = true;
  private _subscriptions: Subscription[] = [];

  constructor(
    private wardrobeService: WardrobeService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this._subscriptions.push(
      this.wardrobeService.wardrobe.subscribe((items) => {
        this.clothingItems = items;
        // console.log('all');
        // console.log(this.articles);
      })
    );
  }

  ondeleteClothingItemSlide(
    event: any,
    clothingItemId: string,
    slidingEl: IonItemSliding
  ) {
    slidingEl.close();
    this.ondeleteClothingItem(clothingItemId, slidingEl);
  }

  onEditClothingItemSlide(
    event: any,
    clothingItemId: string,
    slidingEl: IonItemSliding
  ) {
    slidingEl.close();
    this.onEditClothingItem(clothingItemId, slidingEl);
  }

  onEditClothingItem(clothingItemId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Editing Item...' })
      .then((loadingEl) => {
        loadingEl.present();
        // this.bookingService.cancelBooking(bookingId).subscribe(() => {
        //   loadingEl.dismiss();
        // });
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
        // this.bookingService.cancelBooking(bookingId).subscribe(() => {
        //   loadingEl.dismiss();
        // });
        setTimeout(() => {
          loadingEl.dismiss();
        }, 800);
      });
  }

  ondeleteClothingItem(clothingItemId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: 'Deleting Item...' })
      .then((loadingEl) => {
        loadingEl.present();
        // this.bookingService.cancelBooking(bookingId).subscribe(() => {
        //   loadingEl.dismiss();
        // });
        setTimeout(() => {
          loadingEl.dismiss();
        }, 800);
      });
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
