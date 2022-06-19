import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@shopati/orders';
import { ProductsService } from '@shopati/products';
import { CartItem, Product } from '@types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'shopati-productdetail',
  templateUrl: './productdetail.component.html',
  styles: [],
})
export class ProductdetailComponent implements OnInit, OnDestroy {
  // @ts-ignore
  product: Product;

  endSubs$: Subject<any> = new Subject();

  quantity = 1;
  
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if(param['id']) {
        this._getProduct(param['id']);
      }
    });
  }

  ngOnDestroy(): void {
      this.endSubs$.complete();
  }

  private _getProduct(id: string) {
    this.productsService
        .getProduct(id)
        .pipe(takeUntil(this.endSubs$))
        .subscribe(product => { this.product = product });
  }

  addToCart() {
    if(this.product.id) {
      const cartItem: CartItem = {
        productID: this.product.id,
        quantity: this.quantity,
      }

      this.cartService.setCartItem(cartItem);
    }
  }
}
