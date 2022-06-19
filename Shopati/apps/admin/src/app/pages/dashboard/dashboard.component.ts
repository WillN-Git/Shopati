import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@shopati/orders';
import { ProductsService } from '@shopati/products';
import { UsersService } from '@shopati/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics: Array<number> = [];

  endSubs$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
    .pipe(takeUntil(this.endSubs$))
    .subscribe(stats => {
      this.statistics = stats;
    });
  }

  ngOnDestroy(): void {
    // this.endSubs$.next();
    this.endSubs$.complete();
  }
}
