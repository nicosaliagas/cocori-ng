import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
    selector: 'eye-option-password',
    template: `
        <i class="eyeIcon material-icons">
            <ng-container *ngIf="!revealPasswordStatus" >visibility</ng-container>
            <ng-container *ngIf="revealPasswordStatus" >visibility_off</ng-container>
        </i>
    `,
    styles: [`
        .eyeIcon {
            right: 8px;
            font-size: 20px;
            cursor: pointer;
            position: absolute;
            transform: translateY(-25%);
        }
    `]
})
export class EyeOptionPasswordComponent {
    @Output() revealPassword: EventEmitter<boolean> = new EventEmitter();
    revealPasswordStatus: boolean = false;
    private last: MouseEvent;

    @HostListener('mousedown', ['$event']) eventMouseDown(event: any) {
        this.revealPassword.emit(true);
        this.revealPasswordStatus = true;
    }

    @HostListener('mouseup', ['$event']) eventMouseUp(event: any) {
        this.hidePassword();
    }

    @HostListener('document:mousemove', ['$event']) eventMouseMove(e: MouseEvent) {
        if (this.last && e.clientX !== this.last.clientX) {
            this.hidePassword();
        }
        this.last = e;
    }

    hidePassword() {
        this.revealPassword.emit(false);
        this.revealPasswordStatus = false;
    }
}
