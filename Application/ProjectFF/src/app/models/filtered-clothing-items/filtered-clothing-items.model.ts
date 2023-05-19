import { ClothingItem } from '../clothing-item/clothing-item.model';

export class FilteredClothingItem {
  constructor(public groupName: string, public groupItems: ClothingItem[]) {}
}
