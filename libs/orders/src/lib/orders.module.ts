import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { OrdersummaryComponent } from './components/ordersummary/ordersummary.component';

@NgModule({
  imports: [CommonModule, BadgeModule, ButtonModule],
  declarations: [ShoppingcartComponent, OrdersummaryComponent],
  exports: [ShoppingcartComponent, OrdersummaryComponent],
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    this.cartService.initCartLocalStorage();
  }
}
