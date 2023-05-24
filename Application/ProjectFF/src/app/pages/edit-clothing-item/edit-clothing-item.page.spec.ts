import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditClothingItemPage } from './edit-clothing-item.page';

describe('EditClothingItemPage', () => {
  let component: EditClothingItemPage;
  let fixture: ComponentFixture<EditClothingItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditClothingItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
