import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../token.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService,) { }

  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<any> {

    request = this.addAccessTokenRequest(request);

    return next.handle(request);
  }

  addAccessTokenRequest(request, token?) {
    const accessToken = token || this.tokenService.accessToken;

    if (!accessToken) {
      return request;
    }

    return request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      })
    });
  }
}