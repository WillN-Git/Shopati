import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@types';

@Component({
  selector: 'shopati-productsitem',
  templateUrl: './productsitem.component.html',
})
export class ProductsitemComponent implements OnInit {
  @Input() product: Product = {} as Product;

  constructor() {}

  ngOnInit(): void {}
}
