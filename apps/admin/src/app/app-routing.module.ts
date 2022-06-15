import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGard } from "@shopati/users";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { CategoriesformComponent } from "./pages/categories/categoriesform/categoriesform.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { OrdersdetailComponent } from "./pages/orders/ordersdetail/ordersdetail.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductsformComponent } from "./pages/products/productsform/productsform.component";
import { UsersComponent } from "./pages/users/users.component";
import { UsersformComponent } from "./pages/users/usersform/usersform.component";
import { ShellComponent } from "./shared/shell/shell.component";

const routes: Routes = [
    {
      path: '',
      component: ShellComponent,
      canActivate: [AuthGard],
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
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule],
    providers: [],
    declarations: []
})

export class AppRoutingModule {}