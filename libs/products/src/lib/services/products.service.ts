import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@types';
import { environment as env } from 'environments/environment';

const URL_products = env.API_URL + 'products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(URL_products);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${URL_products}/${id}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(URL_products, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${URL_products}/${id}`);
  }

  updateProduct(productData: FormData, id: string): Observable<Product> {
    return this.http.put<Product>(`${URL_products}/${id}`, productData);
  }  
}
