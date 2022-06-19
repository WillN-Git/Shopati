import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Component
import { ProductsitemComponent } from './components/productsitem/productsitem.component';
import { FeaturedproductsComponent } from './components/featuredproducts/featuredproducts.component';
import { ProductsearchComponent } from './components/productsearch/productsearch.component';
import { CategoriesbannerComponent } from './components/categoriesbanner/categoriesbanner.component';

// UX Module
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule, ToastModule],
  declarations: [
    ProductsearchComponent,
    CategoriesbannerComponent,
    ProductsitemComponent,
    FeaturedproductsComponent,
  ],
  exports: [
    ProductsearchComponent,
    CategoriesbannerComponent,
    ProductsitemComponent,
    FeaturedproductsComponent,
  ],
})
export class ProductsModule {}
