import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoriesformComponent } from './pages/categories/categoriesform/categoriesform.component';

// Services
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CategoriesService } from '@shopati/products';

// UI/UX
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsformComponent } from './pages/products/productsform/productsform.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/form',
        component: CategoriesformComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoriesformComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/form',
        component: ProductsformComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsformComponent,
      },
    ],
  },
];

const UXModules = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  InputNumberModule,
  InputSwitchModule,
  InputTextareaModule,
  FormsModule,
  ToastModule,
  DropdownModule,
  EditorModule,
  ColorPickerModule,
  ReactiveFormsModule,
  ConfirmDialogModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesComponent,
    CategoriesformComponent,
    ProductsComponent,
    ProductsformComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UXModules,
  ],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
