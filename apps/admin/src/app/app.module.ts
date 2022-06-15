import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGard, JwtInterceptor, UsersModule } from '@shopati/users';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoriesformComponent } from './pages/categories/categoriesform/categoriesform.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsformComponent } from './pages/products/productsform/productsform.component';
import { UsersComponent } from './pages/users/users.component';

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
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersformComponent } from './pages/users/usersform/usersform.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersdetailComponent } from './pages/orders/ordersdetail/ordersdetail.component';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGard],
    children: [
      {
        path: 'dashboard',
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
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/form',
        component: UsersformComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersformComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'orders/:id',
        component: OrdersdetailComponent,
      },
    ],
  },
];

const UXModules = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TagModule,
  TableModule,
  InputTextModule,
  InputMaskModule,
  InputNumberModule,
  InputSwitchModule,
  InputTextareaModule,
  FormsModule,
  ToastModule,
  DropdownModule,
  EditorModule,
  FieldsetModule,
  ColorPickerModule,
  ReactiveFormsModule,
  ConfirmDialogModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesComponent,
    CategoriesformComponent,
    ProductsComponent,
    ProductsformComponent,
    UsersComponent,
    UsersformComponent,
    OrdersComponent,
    OrdersdetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UsersModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UXModules,
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
