import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsformComponent } from './productsform.component';

describe('ProductsformComponent', () => {
  let component: ProductsformComponent;
  let fixture: ComponentFixture<ProductsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
