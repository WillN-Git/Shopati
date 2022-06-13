import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '@types';
import { environment as env } from 'environments/environment';

const URL_category = env.API_URL + 'categories';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(URL_category);
  }

  getCategoryId(id: string): Observable<Category> {
    return this.http.get<Category>(`${URL_category}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(URL_category, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${URL_category}/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${URL_category}/${category.id}`, category);
  }
}
