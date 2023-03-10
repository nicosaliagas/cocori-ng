import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService, SkipHeaders } from '../http.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private httpService: HttpService) { }

  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<any> {

    request = this.addAccessTokenRequest(request);

    return next.handle(request);
  }

  addAccessTokenRequest(request, token?) {
    const accessToken = token || this.tokenService.accessToken;

    if (request.headers.get("skip") === SkipHeaders.TRUE) {
      return request = request.clone({
        headers: request.headers.delete('skip')
      });
    }

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