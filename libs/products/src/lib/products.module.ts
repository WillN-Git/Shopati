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

@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule],
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
