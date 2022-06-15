import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '@shopati/orders';
import { Order, OrderItem } from '@types';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../orders.constants';

@Component({
  selector: 'admin-ordersdetail',
  templateUrl: './ordersdetail.component.html',
})
export class OrdersdetailComponent implements OnInit {
  order: Order = {} as Order;
  orderStatuses: { id: string | number, name: string | number }[]= [];
  selectedStatus: any;


  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => ({
        id: parseInt(key),
        name: ORDER_STATUS[parseInt(key)].label
      })
    );
  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.ordersService.getOrder(params['id']).subscribe(order => {
          this.order = order;
          this.selectedStatus = order.status;
        })
      }
    })
  }

  onStatusChange(event: any) {
    this.ordersService.updateOrder({ status: event.value }, this.order.id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Order is updated!',
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Order is not updated!',
        });
      }
    );
  }
}
