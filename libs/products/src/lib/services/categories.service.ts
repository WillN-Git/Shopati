import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '@types';

const URI_category = 'http://localhost:3000/api/v1/categories';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(URI_category);
  }

  getCategoryId(id: string): Observable<Category> {
    return this.http.get<Category>(URI_category + `/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(URI_category, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(URI_category + `/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(URI_category + `/${category.id}`, category);
  }
}
