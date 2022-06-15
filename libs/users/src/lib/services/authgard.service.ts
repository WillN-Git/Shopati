import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGard implements CanActivate {

  constructor(private router: Router, private localstorageToken: LocalstorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.localstorageToken.getToken();

    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      // console.log(tokenDecode);

      if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp))
        return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
