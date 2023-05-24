import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateClothingItemPage } from './create-clothing-item.page';

describe('CreateClothingItemPage', () => {
  let component: CreateClothingItemPage;
  let fixture: ComponentFixture<CreateClothingItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateClothingItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
