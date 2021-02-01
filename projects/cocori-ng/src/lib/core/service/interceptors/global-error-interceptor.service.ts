import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../storage.service';

const LIMIT_MAX_RELOAD: number = 2
const TIME_MAX_RELOAD: number = 30 // secondes

export interface ReloadPageModel {
  date: Date,
  count: number,
}

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorInterceptorService implements ErrorHandler {
  // public globalErrorsHandlerSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private injector: Injector,
    private storageService: StorageService) { }

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    const router = this.injector.get(Router);

    if (error.stack) {
      console.error("details errors 😱 :");
      console.error(error.stack.toString());
    } else {
      console.error("error undefined 😡");
    }

    if (chunkFailedMessage.test(error.message)) {
      // this.globalErrorsHandlerSubject.next(true)
      this.handleReloadPage(error.message.toString())
    }
  }

  private handleReloadPage(message: string) {
    console.log('%cPage reloaded : errors chunk versions', 'color: blue;')

    const reloadPage: ReloadPageModel = this.storageService.getSessionStorageItem('reloadPage');

    if (!reloadPage) {
      this.storageService.setSessionStorageItem('reloadPage', <ReloadPageModel>{ date: new Date(), count: 1 })
    } else if (reloadPage.count < LIMIT_MAX_RELOAD && (new Date().getTime() - new Date(reloadPage.date).getTime()) / 1000 < TIME_MAX_RELOAD) {
      this.storageService.setSessionStorageItem('reloadPage', <ReloadPageModel>{ date: reloadPage.date, count: reloadPage.count + 1 })
    } else {

      message = `Veuillez communiquer cette erreur à l'administrateur du site : \n\n ${message}`

      alert(message)

      this.storageService.deleteSessionStorageItem('reloadPage')
      return;
    }

    window.location.reload();
  }
}