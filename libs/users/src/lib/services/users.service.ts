import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '@types';

const URL_users = env.API_URL + 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL_users);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${URL_users}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(URL_users, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${URL_users}/${user.id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${URL_users}/${id}`);
  }

}
