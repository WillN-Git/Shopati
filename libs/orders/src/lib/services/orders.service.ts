import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@types';
import { map, Observable } from 'rxjs';
import { environment as env } from 'environments/environment';

const URL_orders = env.API_URL + 'orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(URL_orders);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${URL_orders}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(URL_orders, order);
  }

  updateOrder(orderStatus: { status: string }, id: string): Observable<Order> {
    return this.http.put<Order>(`${URL_orders}/${id}`, orderStatus);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${URL_orders}/${id}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http.get<number>(`${URL_orders}/get/count`)
                    .pipe(map((o: any) => o.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http.get<number>(`${URL_orders}/get/totalsales`)
                    .pipe(map((o: any) => o.totalsales));
  }
}
