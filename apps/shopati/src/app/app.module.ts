import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductlistComponent } from './pages/productlist/productlist.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { CartpageComponent } from './pages/cartpage/cartpage.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

// UI/UX
import { UIModule } from '@shopati/ui';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@shopati/products';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { OrdersModule } from '@shopati/orders';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'products',
    component: ProductlistComponent,
  },
  {
    path: 'category/:id',
    component: ProductlistComponent,
  },
  {
    path: 'products/:id',
    component: ProductdetailComponent,
  },
  {
    path: 'cart',
    component: CartpageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
  }
];

const UXModules = [
  AccordionModule,
  BrowserAnimationsModule,
  CheckboxModule,
  FormsModule,
  RatingModule,
  ButtonModule,
  InputNumberModule,
  DropdownModule,
  ReactiveFormsModule,
  InputMaskModule,
  InputTextModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomepageComponent,
    ProductlistComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ProductdetailComponent,
    CartpageComponent,
    CheckoutComponent,
    ThankyouComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ProductsModule,
    OrdersModule,
    UIModule,
    ...UXModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CartpageComponent, CheckoutComponent, ThankyouComponent],
})
export class AppModule {}
