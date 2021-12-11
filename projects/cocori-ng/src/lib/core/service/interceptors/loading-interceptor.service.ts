import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingService } from '../../../feature-core/core/service/loading.service';

@Injectable({
  providedIn: "root",
})
export class LoadingInterceptorService {
  activeRequests: number = 0;
  timer: any;

  constructor(private loadingScreenService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.loadingScreenService.startLoading();
    }

    this.activeRequests++;

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.forceFinalize();
    }, 5000);

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;

        if (this.activeRequests === 0) {
          this.loadingScreenService.stopLoading();

          clearTimeout(this.timer);
        }
      })
    );
  }

  forceFinalize() {
    this.activeRequests = 0;
    this.loadingScreenService.stopLoading();
  }
}
