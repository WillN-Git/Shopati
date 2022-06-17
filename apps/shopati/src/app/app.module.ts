import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductlistComponent } from './pages/productlist/productlist.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// UI/UX
import { UIModule } from '@shopati/ui';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@shopati/products';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'productlist',
    component: ProductlistComponent,
  },
];

const UXModules = [AccordionModule, BrowserAnimationsModule];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomepageComponent,
    ProductlistComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ProductsModule,
    UIModule,
    ...UXModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
