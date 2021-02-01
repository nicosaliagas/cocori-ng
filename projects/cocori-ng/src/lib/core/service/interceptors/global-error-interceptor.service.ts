import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorInterceptorService implements ErrorHandler {

  // public globalErrorsHandlerSubject: Subject<boolean> = new Subject<boolean>();
  
  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    const router = this.injector.get(Router);

    console.error("handleError errors:");
    
    console.error(error.stack.toString());

    if (chunkFailedMessage.test(error.message)) {
      console.log("Page reloaded cause : errors chunk versions")
      
      // this.globalErrorsHandlerSubject.next(true)

      window.location.reload();
    }
  }
}