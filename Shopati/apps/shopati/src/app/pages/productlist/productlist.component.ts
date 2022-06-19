import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@shopati/products';
import { Category, Product } from '@types';
import { Subject, takeUntil } from 'rxjs';

interface CategoryFilterable extends Category {
  checked?: boolean;
}

@Component({
  selector: 'shopati-productlist',
  templateUrl: './productlist.component.html',
})
export class ProductlistComponent implements OnInit, OnDestroy {
    products: Product[] = [];

    categories: CategoryFilterable[] = [];

    endSubs$: Subject<any> = new Subject();

    isCategoryPage = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService, 
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params['id'] ? this._getProducts([params['id']]) : this._getProducts();
      
      params['id'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false); 
    });

    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getProducts(categoriesFilter?: (string | undefined)[]) {
    this.productsService
        .getProducts(categoriesFilter)
        .pipe(takeUntil(this.endSubs$))
        .subscribe(products => { this.products = products });
  }

  private _getCategories() {
    this.categoriesService
        .getCategories()
        .pipe(takeUntil(this.endSubs$))
        .subscribe(categories => { this.categories = categories });
  }

  categoryFilter() {
    const selectedCategories = this.categories
                                  .filter(category => category.checked)
                                  .map(category => category.id);

    this._getProducts(selectedCategories);
  }
}
