import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStacktraceModel } from 'cocori-ng/src/feature-core';

// https://medium.com/@abshakekumar/snackbar-angular-material-component-with-multiple-actions-88ea3a9d3ddd
@Component({
  selector: 'toast-error-stacktrace',
  styleUrls: ['./toast-error-stacktrace.component.scss'],
  templateUrl: './toast-error-stacktrace.component.html'
})
export class ToastErrorStacktraceComponent implements OnInit {

  toggleVisibility : boolean = true;
  errorDebugMessages: string[] = [];

  constructor(
    private matSnackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: ErrorStacktraceModel
  ) { }

  ngOnInit() {
    this.errorDebugMessages = <string[]>this.data.stacktrace?.httpError?.error?.debug?.messages
  }

  afficheCache(){
    this.toggleVisibility = !this.toggleVisibility;
  }

  close(event): void {
    this.matSnackBar.dismiss();

    event.preventDefault();
  }

  trackBy(index: number) {
    return index;
  }
}
