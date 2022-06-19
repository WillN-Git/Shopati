import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localstorageToken: LocalstorageService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageToken.getToken();
    const isAPIURL = req.url.startsWith(env.API_URL);


    if(token && isAPIURL) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      })
    }

    return next.handle(req);
  }
}
