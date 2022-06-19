import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '@types';
import { ORDER_STATUS } from './orders.constants';
import { OrdersService } from '@shopati/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];

  orderStatus = ORDER_STATUS;

  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy(): void {
      this.endSubs$.complete();
  }

  private _getOrders() {
    this.ordersService
        .getOrders()
        .pipe(takeUntil(this.endSubs$))
        .subscribe((orders: Order[]) => {
          this.orders = orders;
        });
  }

  showOrder(id: string) {
    this.router.navigateByUrl(`orders/${id}`);
  }

  deleteOrder(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(id).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'succes',
              detail: 'Order is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Order is not deleted!',
            });
          }
        );
      }
    });
  }
}
