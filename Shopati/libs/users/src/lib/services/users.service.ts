import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '@types';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;

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

  getUsersCount(): Observable<number> {
    return this.http.get<number>(`${URL_users}/get/count`)
                    .pipe(map((o: any) => o.userCount));
  }

  getCountries(): { id: string; name: string }[] {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));

    return Object.entries(countriesLib.getNames('en', { select: 'official' }))
                .map((entry) => ({
                  id: entry[0],
                  name: entry[1],
                }));
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
}
