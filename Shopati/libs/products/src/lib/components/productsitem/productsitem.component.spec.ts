import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsitemComponent } from './productsitem.component';

describe('ProductsitemComponent', () => {
  let component: ProductsitemComponent;
  let fixture: ComponentFixture<ProductsitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsitemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
