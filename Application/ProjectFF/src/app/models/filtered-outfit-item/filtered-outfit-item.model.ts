import { Outfit } from '../outfit/outfit.model';

export class FilteredOutfitItem {
  constructor(public groupName: string, public groupItems: Outfit[]) {}
}
