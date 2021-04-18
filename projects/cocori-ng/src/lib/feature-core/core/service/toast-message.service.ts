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

  visibleDuration: number = 5000;
  subscription: Subscription;

  constructor(private toast: MatSnackBar) { }

  success(message: string, temps: number = this.visibleDuration, callback?: () => void) {
    this.gestionMessage(callback, message, 0, temps);
    return this;
  }

  error(message: string, temps: number = null, callback?: () => void) {
    this.gestionMessage(callback, message, 1, temps);
  }

  // https://stackblitz.com/edit/snackbar-with-html-so?file=app%2Fhome-page%2Fhome-page.component.ts
  // erreurTechnique(details: string, detailsTechnique: string, temps: number = null, callback?: () => void) {
  //   const erreur: ErreurTechnique = { "details": details, "detailsTechnique": detailsTechnique };
  //   this.snackBarRef = this.snackBar.openFromComponent(ToastErreurTechniqueComponent, { data: erreur, 'panelClass': this.type[1] });
  // }

  info(message: string, temps: number = this.visibleDuration, callback?: () => void) {
    this.gestionMessage(callback, message, 2, temps);
  }

  private gestionMessage(callback: () => void, message: string, typeMessage: number, temps: number, position: MatSnackBarVerticalPosition = 'bottom') {
    this.callback = callback;
    this.afficher(message, this.classCss[typeMessage], temps, position);
  }

  private afficher(message: string, type: string, temps?: number, position?: MatSnackBarVerticalPosition) {
    if (!temps) {
      this.toastRef = this.toast.open(message, 'Fermer', { 'panelClass': type, 'verticalPosition': position });
    } else {
      this.toastRef = this.toast.open(message, 'Fermer', { 'panelClass': type, 'duration': temps, 'verticalPosition': position });
    }

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
