import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOutfitPage } from './create-outfit.page';

describe('CreateOutfitPage', () => {
  let component: CreateOutfitPage;
  let fixture: ComponentFixture<CreateOutfitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateOutfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
