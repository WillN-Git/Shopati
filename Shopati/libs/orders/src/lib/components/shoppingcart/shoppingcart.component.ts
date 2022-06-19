import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'shopati-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styles: [],
})
export class ShoppingcartComponent implements OnInit {
  quantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.quantity = cart?.items.length ?? 0;
    })
  }
}
