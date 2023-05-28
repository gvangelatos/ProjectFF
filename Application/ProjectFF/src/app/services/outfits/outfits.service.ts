import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, switchMap, take, tap } from 'rxjs';
import { Settings } from 'src/app/constants/constants';
import { FilteredOutfitItem } from 'src/app/models/filtered-outfit-item/filtered-outfit-item.model';
import { Outfit } from 'src/app/models/outfit/outfit.model';
import { WardrobeService } from '../wardrobe/wardrobe.service';

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
    {
      items: [
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
      name: 'Around the house',
      setting: 'Casual',
      id: '12888867',
      isFavorite: false,
      createdAt: new Date(),
    },
    {
      items: [
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
          type: 'Clothing',
          subType: 'T-Shirt',
          imageUrl:
            'https://gant.com/dw/image/v2/BFLN_PRD/on/demandware.static/-/Sites-gant-master/default/dwf2e5d003/pim/202204/234100/110/202204-234100-110-flat-fv-1.jpg?sw=650',
          id: '617253',
          color: 'white',
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
      name: 'Beers with the guys',
      setting: 'Casual',
      id: '12675111367',
      isFavorite: false,
      createdAt: new Date(),
    },
    {
      items: [
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
          setting: 'Casual',
          type: 'Footwear',
          subType: 'Sneakers',
          imageUrl:
            'https://media.capeunionmart.co.za/i/poetrystores/102810130_C85_1?$large_PROD$',
          id: '9857553',
          color: 'white',
        },
      ],
      name: 'Minimal',
      setting: 'Casual',
      id: '126752332367',
      isFavorite: false,
      createdAt: new Date(),
    },
    {
      items: [
        {
          setting: 'Casual',
          type: 'Footwear',
          subType: 'Sneakers',
          imageUrl:
            'https://media.capeunionmart.co.za/i/poetrystores/102810130_C85_1?$large_PROD$',
          id: '9857553',
          color: 'white',
        },
      ],
      name: 'Shoes only',
      setting: 'Casual',
      id: '126753671212',
      isFavorite: false,
      createdAt: new Date(),
    },
    {
      items: [
        {
          setting: 'Casual',
          type: 'Clothing',
          subType: 'Jeans',
          imageUrl:
            'https://img.freepik.com/premium-photo/jeans-trousers-hanging-with-wood-hanger-wall_1339-156588.jpg?w=2000',
          id: '6232253',
          color: 'blue',
        },
      ],
      name: 'Jeans only',
      setting: 'Casual',
      id: '12675333367',
      isFavorite: false,
      createdAt: new Date(),
    },
  ]);

  private _outfitsFiltered = new BehaviorSubject<FilteredOutfitItem[]>([]);

  constructor(private wardrobeService: WardrobeService) {}

  get outfits() {
    return this._outfits.pipe(delay(800));
  }

  get filteredOutfits() {
    return this._outfitsFiltered.pipe(delay(800));
  }

  getFilteredOutfits(filter: 'setting' | 'itemsNumber' | 'favorites' | string) {
    return this.outfits.pipe(
      take(1),
      delay(500),
      tap((outfits) => {
        let updatedFilteredOutfits = [];
        if (filter === 'setting') {
          for (let index = 0; index < Settings.length; index++) {
            let filteredItems = outfits.filter((item) => {
              return item.setting === Settings[index];
            });
            if (filteredItems && filteredItems.length) {
              updatedFilteredOutfits.push(<FilteredOutfitItem>{
                groupName: Settings[index],
                groupItems: [...filteredItems],
              });
            }
          }
        } else if (filter === 'itemsNumber') {
          const uniqueNumbers = [
            ...new Set(outfits.map((item) => item.items.length)),
          ];
          for (let index = 0; index < uniqueNumbers.length; index++) {
            let filteredItems = outfits.filter((item) => {
              return item.items.length === uniqueNumbers[index];
            });
            if (filteredItems && filteredItems.length) {
              updatedFilteredOutfits.push(<FilteredOutfitItem>{
                groupName: uniqueNumbers[index].toString(),
                groupItems: [...filteredItems],
              });
            }
          }
        } else if (filter === 'favorites') {
          let filteredItems = outfits.filter((item) => {
            return item.isFavorite === true;
          });
          if (filteredItems && filteredItems.length) {
            updatedFilteredOutfits.push(<FilteredOutfitItem>{
              groupName: 'Favorites',
              groupItems: [...filteredItems],
            });
          }
        }
        this._outfitsFiltered.next([...updatedFilteredOutfits]);
      })
    );
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

  toggleOutfitFavorite(itemId: string, activeFilter?: string) {
    return this.outfits.pipe(
      take(1),
      delay(100),
      tap((outfits) => {
        const selectedOutfit = <Outfit[]>[
          ...outfits.filter((outfit) => outfit.id === itemId),
        ];
        if (!selectedOutfit.length) {
          return;
        }
        const updatedOutfitIndex = outfits.findIndex(
          (outfit) => outfit.id === itemId
        );
        const updatedOutfits = [...outfits];
        const old = updatedOutfits[updatedOutfitIndex];
        updatedOutfits[updatedOutfitIndex] = new Outfit(
          old.items,
          old.name,
          old.setting,
          old.id,
          old.createdAt,
          old.isFavorite ? false : true
        );
        this._outfits.next(updatedOutfits);

        if (activeFilter) {
          this.getFilteredOutfits(activeFilter);
        }
      })
    );
  }

  addClothingItemToOutfit(outfitId: string, clothingItemId: string) {
    return this.outfits.pipe(
      take(1),
      delay(200),
      switchMap((outfits: Outfit[]) => {
        return this.wardrobeService.getClothingItemsById(clothingItemId).pipe(
          tap((item) => {
            const updatedOutfitIndex = outfits.findIndex(
              (outfit) => outfit.id === outfitId
            );
            const updatedOutfitItems = [
              ...outfits[updatedOutfitIndex].items,
              item,
            ];
            const updatedOutfit = <Outfit>{
              ...outfits[updatedOutfitIndex],
              items: [...updatedOutfitItems],
            };
            let updatedOutfits = [...outfits];
            updatedOutfits[updatedOutfitIndex] = updatedOutfit;
            this._outfits.next(updatedOutfits);
          })
        );
      })
    );
  }

  removeClothingItemFromOutfit(outfitId: string, clothingItemId: string) {
    return this.outfits.pipe(
      take(1),
      delay(100),
      tap((outfits) => {
        const updatedOutfitIndex = outfits.findIndex(
          (outfit) => outfit.id === outfitId
        );
        const updatedOutfitItems = [
          ...outfits[updatedOutfitIndex].items.filter(
            (item) => item.id !== clothingItemId
          ),
        ];
        const updatedOutfit = <Outfit>{
          ...outfits[updatedOutfitIndex],
          items: [...updatedOutfitItems],
        };
        let updatedOutfits = [...outfits];
        updatedOutfits[updatedOutfitIndex] = updatedOutfit;
        this._outfits.next(updatedOutfits);
      })
    );
  }
}
