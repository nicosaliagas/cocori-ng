import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ToastErrorStacktraceComponent } from './toast-error-stacktrace.component';

@NgModule({
    declarations: [ToastErrorStacktraceComponent],
    imports: [
        CommonModule,
        MatIconModule,
    ],
    exports: [ToastErrorStacktraceComponent]
})
export class ToastErrorStacktraceModule { }