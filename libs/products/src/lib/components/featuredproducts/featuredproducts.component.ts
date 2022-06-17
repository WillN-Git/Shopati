import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@types';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'shopati-featuredproducts',
  templateUrl: './featuredproducts.component.html',
})
export class FeaturedproductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];

  endSubs$: Subject<any> = new Subject();
  
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
      this.endSubs$.complete();
  }

  private _getFeaturedProducts() {
    this.productsService
        .getFeaturedProducts(4)
        .pipe(takeUntil(this.endSubs$))
        .subscribe(featProducts => {
          this.featuredProducts = featProducts;
        });
  }
}
