import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';

import { CocoringConfirmModalComponent } from '../../shared/component/modal/confirm-modal/cocoring-confirm-modal.component';
import { ModalOptionsModel } from '../model/modal.model';

@Injectable({
    providedIn: 'root',
})
export class ConfirmModalService {
    dialogRef: MatDialogRef<CocoringConfirmModalComponent>;

    constructor(private dialog: MatDialog) { }

    public open(options: ModalOptionsModel) {
        this.dialogRef = this.dialog.open(CocoringConfirmModalComponent, {
            data: <ModalOptionsModel>{
                withForm: options.withForm,
                title: options.title,
                message: options.message,
                cancelText: options.cancelText,
                confirmText: options.confirmText
            }
        });
    }

    public confirmed<T>(): Observable<T> {
        return this.dialogRef.afterClosed().pipe(
            take(1),
            map((res: T) => {
                return res;
            }
            ));
    }
}
