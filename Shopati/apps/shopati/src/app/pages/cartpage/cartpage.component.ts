import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, OrdersService } from '@shopati/orders';
import { CartItemDetailed } from '@types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'shopati-cartpage',
  templateUrl: './cartpage.component.html',
  styles: [],
})
export class CartpageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];

  quantity = 0;

  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService
        .cart$
        .pipe(takeUntil(this.endSubs$))
        .subscribe(respCart => {
          this.cartItemsDetailed = [];
          this.quantity = respCart?.items.length ?? 0;

          respCart?.items.forEach((cartItem) => {
            this.ordersService.getProduct(cartItem.productID).subscribe((respProd) => {
              this.cartItemsDetailed.push({
                product: respProd,
                quantity: cartItem.quantity,
              });
            });
          });
        });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productID: cartItem.product.id,
        quantity: event.value,
      },
      true
    );
  }
}
