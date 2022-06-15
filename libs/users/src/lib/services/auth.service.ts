import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@types';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';


const URL_users = env.API_URL + 'users'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private token: LocalstorageService
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${URL_users}/login`, { email, password });
  }
  
  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
