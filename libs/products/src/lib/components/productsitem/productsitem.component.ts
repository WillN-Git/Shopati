import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@types';

@Component({
  selector: 'shopati-productsitem',
  templateUrl: './productsitem.component.html',
})
export class ProductsitemComponent implements OnInit {
  @Input() product: Product = {} as Product;

  isProductsPage = false;

  linkStart = '';

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.isProductsPage = this.route.url === '/products';

    this.linkStart = this.isProductsPage ? '' : 'products/';
  }
}
