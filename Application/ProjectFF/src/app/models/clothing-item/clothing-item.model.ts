import {
  AccessoriesSubType,
  ClothingSubType,
  ClothingType,
  FootwearSubType,
  Setting,
  UndergarmentsSubType,
} from '../clothing-types/clothing-types.model';

export class ClothingItem {
  constructor(
    public setting: Setting,
    public type: ClothingType,
    public subType:
      | ClothingSubType
      | UndergarmentsSubType
      | AccessoriesSubType
      | FootwearSubType,
    public imageUrl: string,
    public id: string
  ) {}
}
