import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
    AutoUnsubscribeComponent,
    ButtonComponentInputs,
    ButtonIconPositon,
    TypeButtonEnum,
} from '@cocori-ng/lib/src/lib/feature-core';

import { LoadingService } from '../../../core/service/loading.service';

@Component({
    selector: 'cocoring-button',
    templateUrl: 'cocoring-button.component.html',
    styleUrls: ['./cocoring-button.component.scss']
})
export class CocoringButtonComponent extends AutoUnsubscribeComponent implements OnInit, OnDestroy {
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

    constructor(
        private loadingService: LoadingService,
        private cdr: ChangeDetectorRef,) {
        super()


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
        this.subscriptions.add(
            this.loadingService.subject.subscribe((isLoading: boolean) => {
                this.isLoading = isLoading
                this.cdr.detectChanges()
            })
        )

        this.callback.emit(this.text);
    }

    onClick() {
        if (this.type === TypeButtonEnum.SUBMIT && this.onClickSubmit) {
            this.onClickSubmit()
        } else if (this.type === TypeButtonEnum.BUTTON && this.onClickSubmit) {
            this.click.emit()
        }
    }
}
