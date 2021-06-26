import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  private classCss: string[] = ["succesToast", "errorToast", "infoToast"];
  private callback: Function;
  private toastRef: any;
  private buttonAction: string = 'Fermer'

  defaultDuration: number = 5000;
  subscription: Subscription;

  constructor(private toast: MatSnackBar) { }

  success(message: string, temps: number = this.defaultDuration, callback?: () => void) {
    this.messageHandler(callback, message, 0, temps, null);
  }

  error(message: string, temps: number = null, callback?: () => void) {
    this.messageHandler(callback, message, 1, temps, this.buttonAction);
  }

  // https://stackblitz.com/edit/snackbar-with-html-so?file=app%2Fhome-page%2Fhome-page.component.ts
  // erreurTechnique(details: string, detailsTechnique: string, temps: number = null, callback?: () => void) {
  //   const erreur: ErreurTechnique = { "details": details, "detailsTechnique": detailsTechnique };
  //   this.snackBarRef = this.snackBar.openFromComponent(ToastErreurTechniqueComponent, { data: erreur, 'panelClass': this.type[1] });
  // }

  info(message: string, temps: number = this.defaultDuration, callback?: () => void) {
    this.messageHandler(callback, message, 2, temps, null);
  }

  private messageHandler(callback: () => void, message: string, messageStyle: number, duration: number, buttonActionText: string , position: MatSnackBarVerticalPosition = 'bottom') {
    this.callback = callback;

    const options = {
      'panelClass': this.classCss[messageStyle],
      'duration': !duration ? 0 : duration,
      'verticalPosition': position
    }

    this.toastRef = this.toast.open(message, buttonActionText, options);

    this.aLaFermeture();
  }

  private aLaFermeture() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.toastRef.afterDismissed().subscribe(() => {
      if (this.callback) this.callback();
    });
  }

  cacher() {
    this.toast.dismiss();
  }
}
