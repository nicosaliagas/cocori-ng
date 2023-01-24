import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  startLoading() {
    this.subject.next(true);
  }

  stopLoading() {
    this.subject.next(false);
  }
}

@Injectable({
  providedIn: "root",
})
export class LoadingInterceptorService {
  activeRequests: number = 0;
  timer: any;

  constructor(private loadingScreenService: LoadingService) { }

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
