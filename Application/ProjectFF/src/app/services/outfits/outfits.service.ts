import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, take, tap } from 'rxjs';
import { Outfit } from 'src/app/models/outfit/outfit.model';

@Injectable({
  providedIn: 'root',
})
export class OutfitsService {
  private _outfits = new BehaviorSubject<Outfit[]>([
    {
      items: [
        {
          setting: 'Casual',
          type: 'Clothing',
          subType: 'T-Shirt',
          imageUrl:
            'https://gant.com/dw/image/v2/BFLN_PRD/on/demandware.static/-/Sites-gant-master/default/dwf2e5d003/pim/202204/234100/110/202204-234100-110-flat-fv-1.jpg?sw=650',
          id: '617253',
          color: 'white',
        },
        {
          setting: 'Casual',
          type: 'Clothing',
          subType: 'Jeans',
          imageUrl:
            'https://img.freepik.com/premium-photo/jeans-trousers-hanging-with-wood-hanger-wall_1339-156588.jpg?w=2000',
          id: '6232253',
          color: 'blue',
        },
        {
          setting: 'Casual',
          type: 'Footwear',
          subType: 'Sneakers',
          imageUrl:
            'https://media.capeunionmart.co.za/i/poetrystores/102810130_C85_1?$large_PROD$',
          id: '9857553',
          color: 'white',
        },
        {
          setting: 'Casual',
          type: 'Accessory',
          subType: 'Ring',
          imageUrl:
            'https://cdn.shopify.com/s/files/1/1915/8837/products/20170518-product-image-221164957_2048x2048_9da7c6c5-78c7-40f0-a108-9d1106a41b15_grande.jpg?v=1527369292',
          id: '98023153',
          color: 'silver',
        },
      ],
      name: 'Outing for coffee',
      setting: 'Casual',
      id: '12675367',
      isFavorite: true,
      createdAt: new Date(),
    },
  ]);

  constructor() {}

  get outfits() {
    return this._outfits.pipe(delay(800));
  }

  getOutfitById(id: string) {
    return this.outfits.pipe(
      take(1),
      delay(500),
      map((outfits) => {
        return <Outfit[]>[...outfits.filter((item) => item.id === id)];
      })
    );
  }

  getOutfitBySetting(setting: string) {
    return this.outfits.pipe(
      take(1),
      delay(500),
      map((outfits) => {
        return <Outfit[]>[
          ...outfits.filter((item) => item.setting === setting),
        ];
      })
    );
  }

  deleteOutfit(itemId: string) {
    return this.outfits.pipe(
      take(1),
      delay(500),
      tap((outfits) => {
        const updatedOutfits = <Outfit[]>[
          ...outfits.filter((outfit) => outfit.id !== itemId),
        ];
        this._outfits.next(updatedOutfits);
      })
    );
  }
}
