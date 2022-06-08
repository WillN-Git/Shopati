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

// Module
import  { UIModule } from '@shopati/ui'

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

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomepageComponent,
    ProductlistComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), UIModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
