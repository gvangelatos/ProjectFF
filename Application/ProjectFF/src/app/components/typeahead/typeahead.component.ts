import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Outfit } from 'src/app/models/outfit/outfit.model';
import { OutfitsService } from 'src/app/services/outfits/outfits.service';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TypeaheadComponent implements OnInit, OnChanges {
  @Input() items: Outfit[] | any[] = [];
  @Input() selectedItems: string[] = [];
  @Input() title = 'Select Items';
  @Input() selectedItemId: string | undefined;
  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();
  availableInOutfits: number[] = [];

  filteredItems: Outfit[] | any[] = [];
  workingSelectedValues: string[] = [];

  constructor(
    private outfitsService: OutfitsService,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedItemId'] &&
      changes['selectedItemId'].currentValue !== '' &&
      changes['items'] &&
      changes['items'].currentValue.length
    ) {
      this.updateActionArray();
    }
  }

  updateActionArray() {
    this.availableInOutfits = [];
    for (let index = 0; index < this.items.length; index++) {
      const result = this.items[index].items.find(
        (item: { id: string | undefined }) => item.id === this.selectedItemId
      );
      this.availableInOutfits.push(result ? 1 : 0);
    }
  }

  onAddOrRemoveFromOutfit(
    outfitid: string,
    isInOutfit: boolean | number,
    index: number
  ) {
    if (!isInOutfit) {
      this.availableInOutfits[index] = 2;
      this.outfitsService
        .addClothingItemToOutfit(outfitid, <string>this.selectedItemId)
        .subscribe((res) => {
          this.availableInOutfits[index] = 1;
          this.toastCtrl
            .create({
              message: 'Added Successfully!',
              duration: 1500,
              position: 'bottom',
              icon: 'checkmark-circle-outline',
              color: 'success',
            })
            .then((toastEl) => {
              toastEl.present();
            });
        });
    } else {
      this.availableInOutfits[index] = 2;
      this.outfitsService
        .removeClothingItemFromOutfit(outfitid, <string>this.selectedItemId)
        .subscribe((res) => {
          this.availableInOutfits[index] = 0;
          this.toastCtrl
            .create({
              message: 'Removed Successfully!',
              duration: 1500,
              position: 'bottom',
              icon: 'checkmark-circle-outline',
              color: 'success',
            })
            .then((toastEl) => {
              toastEl.present();
            });
        });
    }
  }

  trackItems(index: number, item: Outfit) {
    return item.id;
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  searchbarInput(ev: any) {
    this.filterList(ev.target.value);
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined) {
      this.filteredItems = [...this.items];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter((item) => {
        return item.name.toLowerCase().includes(normalizedQuery);
      });
    }
  }

  isChecked(id: string) {
    return this.workingSelectedValues.find((item) => item === id);
  }

  checkboxChange(ev: any) {
    const { checked, value } = ev.detail;

    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter(
        (item) => item !== value
      );
    }
  }
}
