import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ButtonComponentInputs, ButtonIconPositon, TypeButtonEnum } from '../../../core/model/component-inputs.model';
import { LoadingService } from '../../../core/service/loading.service';

@Component({
    selector: 'cocoring-button',
    templateUrl: 'cocoring-button.component.html',
    styleUrls: ['./cocoring-button.component.scss']
})
export class CocoringButtonComponent implements OnInit, OnDestroy {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();
    @Output() click: EventEmitter<string> = new EventEmitter<string>();

    @Input() disabled: boolean = false;
    @Input() text: string;
    @Input() type: string = TypeButtonEnum.SUBMIT;
    @Input() class: string = 'primary';

    onClickSubmit: Function;
    isLoading: boolean = false;
    icon: string;
    iconPosition: ButtonIconPositon;

    private readonly destroy$ = new Subject();

    constructor(
        private loadingService: LoadingService,
        private cdr: ChangeDetectorRef,) {
    }

    @Input()
    set config(config: ButtonComponentInputs) {
        if (!config) return;

        this.text = config.text;
        this.icon = config.icon;
        this.class = config.className || this.class;
        this.iconPosition = config.iconPosition;
        this.type = config.type;
        this.onClickSubmit = config.onClickSubmit;
    }

    ngOnInit() {
        this.loadingService.subject.pipe(
            takeUntil(this.destroy$)
        ).subscribe((isLoading: boolean) => {
            this.isLoading = isLoading
            this.cdr.detectChanges()
        })

        this.callback.emit(this.text);
    }

    ngOnDestroy(): void {
        this.destroy$.next(undefined);
        this.destroy$.complete();
    }

    onClick() {
        if (this.type === TypeButtonEnum.SUBMIT && this.onClickSubmit) {
            this.onClickSubmit()
        } else if (this.type === TypeButtonEnum.BUTTON && this.onClickSubmit) {
            this.click.emit()
        }
    }
}
