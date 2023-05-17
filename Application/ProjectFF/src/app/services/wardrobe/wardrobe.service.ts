import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, take } from 'rxjs';
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';

@Injectable({
  providedIn: 'root',
})
export class WardrobeService {
  private _wardrobe = new BehaviorSubject<ClothingItem[]>([
    {
      setting: 'Casual',
      type: 'Clothing',
      subType: 'T-Shirt',
      imageUrl:
        'https://gant.com/dw/image/v2/BFLN_PRD/on/demandware.static/-/Sites-gant-master/default/dwf2e5d003/pim/202204/234100/110/202204-234100-110-flat-fv-1.jpg?sw=650',
      id: '617253',
    },
    {
      setting: 'Casual',
      type: 'Clothing',
      subType: 'Jeans',
      imageUrl:
        'https://img.freepik.com/premium-photo/jeans-trousers-hanging-with-wood-hanger-wall_1339-156588.jpg?w=2000',
      id: '6232253',
    },
    {
      setting: 'Casual',
      type: 'Footwear',
      subType: 'Sneakers',
      imageUrl:
        'https://media.capeunionmart.co.za/i/poetrystores/102810130_C85_1?$large_PROD$',
      id: '9857553',
    },
    {
      setting: 'Casual',
      type: 'Accessory',
      subType: 'Ring',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1915/8837/products/20170518-product-image-221164957_2048x2048_9da7c6c5-78c7-40f0-a108-9d1106a41b15_grande.jpg?v=1527369292',
      id: '98023153',
    },
    {
      setting: 'Business',
      type: 'Clothing',
      subType: 'Shirt',
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/other-stories-shirt-1567691304.jpeg',
      id: '009092109',
    },
  ]);
  constructor() {}

  get wardrobe() {
    return this._wardrobe.pipe(delay(1000));
  }

  getClothingItemsByType(type: string) {
    return this.wardrobe.pipe(
      take(1),
      delay(1000),
      map((clothingItems) => {
        return <ClothingItem[]>[
          ...clothingItems.filter((item) => item.type === type),
        ];
      })
    );
  }

  getClothingItemsBySetting(setting: string) {
    return this.wardrobe.pipe(
      take(1),
      delay(1000),
      map((clothingItems) => {
        return <ClothingItem[]>[
          ...clothingItems.filter((item) => item.setting === setting),
        ];
      })
    );
  }
}
