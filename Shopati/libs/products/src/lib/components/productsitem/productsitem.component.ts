import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@shopati/orders';
import { CartItem, Product } from '@types';

@Component({
  selector: 'shopati-productsitem',
  templateUrl: './productsitem.component.html',
})
export class ProductsitemComponent implements OnInit {
  @Input() product: Product = {} as Product;

  isProductsPage = false;

  linkStart = '';

  constructor(private route: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.isProductsPage = this.route.url === '/products';

    this.linkStart = this.isProductsPage ? '' : 'products/';
  }

  addToCart() {
    if(this.product.id) {
      const cartItem: CartItem = {
        productID: this.product.id,
        quantity: 1,
      }
      this.cartService.setCartItem(cartItem);
    }
  }
}
