import { Component, OnInit } from '@angular/core';
import { Order } from '@types';
import { ORDER_STATUS } from './orders.constants';
import { OrdersService } from '@shopati/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  orderStatus = ORDER_STATUS;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe((orders: Order[]) => {
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
