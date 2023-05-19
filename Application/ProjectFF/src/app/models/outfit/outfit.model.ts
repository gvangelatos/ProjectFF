import { ClothingItem } from '../clothing-item/clothing-item.model';
import { Setting } from '../clothing-types/clothing-types.model';

export class Outfit {
  constructor(
    public items: ClothingItem[],
    public name: string,
    public setting: Setting,
    public id: string,
    public createdAt: Date,
    public isFavorite: boolean
  ) {}
}
