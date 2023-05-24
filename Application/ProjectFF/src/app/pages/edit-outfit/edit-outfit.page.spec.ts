import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditOutfitPage } from './edit-outfit.page';

describe('EditOutfitPage', () => {
  let component: EditOutfitPage;
  let fixture: ComponentFixture<EditOutfitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditOutfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
