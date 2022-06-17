import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '@types';
import { environment as env } from 'environments/environment';

const URL_products = env.API_URL + 'products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts(categoriesFilter?: (string | undefined)[]): Observable<Product[]> {
    let params = new HttpParams();

    if(categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }

    return this.http.get<Product[]>(URL_products, { params });
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

  getProductsCount(): Observable<number> {
    return this.http.get<number>(`${URL_products}/get/count`)
                    .pipe(map((o: any) => o.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${URL_products}/get/featured/${count}`);
  }
}
