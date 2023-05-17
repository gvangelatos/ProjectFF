import { ClothingItem } from '../clothing-item/clothing-item.model';
import { Setting } from '../clothing-types/clothing-types.model';

export class Outfit {
  constructor(
    public items: ClothingItem[],
    public name: String,
    public setting: Setting
  ) {}
}
