import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { ModalOptionsModel } from '@cocori-ng/lib/src/lib/feature-core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CocoringConfirmModalComponent } from '../../shared/component/modal/confirm-modal/cocoring-confirm-modal.component';

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
