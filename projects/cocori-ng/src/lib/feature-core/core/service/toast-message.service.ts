import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  private classCss: string[] = ["succesToast", "errorToast", "infoToast"];
  private callback: Function;
  private toastRef: any;
  private buttonAction: string = 'Fermer'

  defaultDuration: number = 5000;
  defaultErrorDuration: number = 6500;

  subscription: Subscription;

  constructor(
    private toast: MatSnackBar,
    public router: Router,) {
    this.onChangeUrl()
  }

  private onChangeUrl() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        filter(() => !!this.toastRef),
      )
      .subscribe(() => this.dismiss())
  }

  success(message: string, callback?: () => void, duration: number = this.defaultDuration) {
    this.messageHandler(callback, message, 0, duration, null);
  }

  error(message: string, callback?: () => void, duration: number = this.defaultErrorDuration) {
    this.messageHandler(callback, message, 1, duration, this.buttonAction);
  }

  // https://stackblitz.com/edit/snackbar-with-html-so?file=app%2Fhome-page%2Fhome-page.component.ts
  // erreurTechnique(details: string, detailsTechnique: string, temps: number = null, callback?: () => void) {
  //   const erreur: ErreurTechnique = { "details": details, "detailsTechnique": detailsTechnique };
  //   this.snackBarRef = this.snackBar.openFromComponent(ToastErreurTechniqueComponent, { data: erreur, 'panelClass': this.type[1] });
  // }

  info(message: string, callback?: () => void, duration: number = this.defaultDuration) {
    this.messageHandler(callback, message, 2, duration, null);
  }

  private messageHandler(callback: () => void, message: string, messageStyle: number, duration: number, buttonActionText: string, position: MatSnackBarVerticalPosition = 'bottom') {
    this.callback = callback;

    const options = {
      'panelClass': this.classCss[messageStyle],
      'duration': !duration ? 0 : duration,
      'verticalPosition': position
    }

    this.toastRef = this.toast.open(message, buttonActionText, options);

    this.onDismiss();
  }

  private onDismiss() {
    if (this.subscription) this.subscription.unsubscribe();

    this.subscription = this.toastRef.afterDismissed().subscribe(() => {
      if (this.callback) this.callback();
    });
  }

  dismiss() {
    this.toast.dismiss();
  }
}
