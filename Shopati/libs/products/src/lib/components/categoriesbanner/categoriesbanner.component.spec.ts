import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesbannerComponent } from './categoriesbanner.component';

describe('CategoriesbannerComponent', () => {
  let component: CategoriesbannerComponent;
  let fixture: ComponentFixture<CategoriesbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesbannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
