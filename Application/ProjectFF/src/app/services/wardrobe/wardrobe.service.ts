import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, take, tap } from 'rxjs';
import { ClothingTypes, Settings } from 'src/app/constants/constants';
import { ClothingItem } from 'src/app/models/clothing-item/clothing-item.model';
import { FilteredClothingItem } from 'src/app/models/filtered-clothing-items/filtered-clothing-items.model';

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
        'https://d2ob0iztsaxy5v.cloudfront.net/product/340065/3400651760m7_zm.jpg',
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
    {
      setting: 'Business',
      type: 'Clothing',
      subType: 'Shirt',
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/other-stories-shirt-1567691304.jpeg',
      id: '009092109',
      color: 'white',
    },
  ]);

  private _wardrobeFiltered = new BehaviorSubject<FilteredClothingItem[]>([]);

  constructor() {}

  get wardrobeFiltered() {
    return this._wardrobeFiltered.pipe(delay(800));
  }

  get wardrobe() {
    return this._wardrobe.pipe(delay(800));
  }

  getClothingItemsByType(type: string) {
    return this.wardrobe.pipe(
      take(1),
      delay(500),
      map((clothingItems) => {
        return <ClothingItem[]>[
          ...clothingItems.filter((item) => item.type === type),
        ];
      })
    );
  }

  addClothingItem(item: ClothingItem) {
    return this.wardrobe.pipe(
      take(1),
      delay(300),
      tap((clothingItems) => {
        let updatedWardrobe = <ClothingItem[]>[...clothingItems];
        updatedWardrobe.push(item);
        this._wardrobe.next(updatedWardrobe);
      })
    );
  }

  deleteClothingItem(itemId: string) {
    return this.wardrobe.pipe(
      take(1),
      delay(500),
      tap((clothingItems) => {
        const updatedWardrobe = <ClothingItem[]>[
          ...clothingItems.filter((item) => item.id !== itemId),
        ];
        this._wardrobe.next(updatedWardrobe);
      })
    );
  }

  getClothingItemsById(itemId: string) {
    return this.wardrobe.pipe(
      take(1),
      delay(500),
      map((clothingItems) => {
        return <ClothingItem[]>[
          ...clothingItems.filter((item) => item.id === itemId),
        ];
      })
    );
  }

  getFilteredWardrobe(filter: 'type' | 'setting' | 'color' | string) {
    return this.wardrobe.pipe(
      take(1),
      delay(500),
      tap((clothingItems) => {
        let updatedFilteredWardrobe = [];
        if (filter === 'type') {
          for (let index = 0; index < ClothingTypes.length; index++) {
            let filteredItems = clothingItems.filter((item) => {
              return item.type === ClothingTypes[index];
            });
            if (filteredItems && filteredItems.length) {
              updatedFilteredWardrobe.push(<FilteredClothingItem>{
                groupName: ClothingTypes[index],
                groupItems: [...filteredItems],
              });
            }
          }
        } else if (filter === 'setting') {
          for (let index = 0; index < Settings.length; index++) {
            let filteredItems = clothingItems.filter((item) => {
              return item.setting === Settings[index];
            });
            if (filteredItems && filteredItems.length) {
              updatedFilteredWardrobe.push(<FilteredClothingItem>{
                groupName: Settings[index],
                groupItems: [...filteredItems],
              });
            }
          }
        } else if (filter === 'color') {
          const uniqueColors = [
            ...new Set(clothingItems.map((item) => item.color)),
          ];
          for (let index = 0; index < uniqueColors.length; index++) {
            let filteredItems = clothingItems.filter((item) => {
              return item.color === uniqueColors[index];
            });
            if (filteredItems && filteredItems.length) {
              updatedFilteredWardrobe.push(<FilteredClothingItem>{
                groupName: uniqueColors[index],
                groupItems: [...filteredItems],
              });
            }
          }
        }
        this._wardrobeFiltered.next([...updatedFilteredWardrobe]);
      })
    );
  }

  updateClothingItem(clothingItem: ClothingItem) {
    return this.wardrobe.pipe(
      take(1),
      delay(300),
      tap((items) => {
        const updatedClothingItemIndex = items.findIndex(
          (item) => item.id === clothingItem.id
        );
        const updatedClothingItems = [...items];
        updatedClothingItems[updatedClothingItemIndex] = clothingItem;
        this._wardrobe.next(updatedClothingItems);
      })
    );
  }

  getClothingItemsBySetting(setting: string) {
    return this.wardrobe.pipe(
      take(1),
      delay(500),
      map((clothingItems) => {
        return <ClothingItem[]>[
          ...clothingItems.filter((item) => item.setting === setting),
        ];
      })
    );
  }

  getClothingItemsByColor(color: string) {
    return this.wardrobe.pipe(
      take(1),
      delay(500),
      map((clothingItems) => {
        return <ClothingItem[]>[
          ...clothingItems.filter((item) => item.color === color),
        ];
      })
    );
  }
}
