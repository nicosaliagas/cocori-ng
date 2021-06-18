import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
    ButtonComponentInputs,
    ButtonIconPositon,
    DefaultConfigComponent,
    TypeButtonEnum,
} from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../core/service/loading.service';

@Component({
    selector: 'cocoring-button',
    templateUrl: 'cocoring-button.component.html',
    styleUrls: ['./cocoring-button.component.scss']
})
export class CocoringButtonComponent implements OnInit, OnDestroy {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();
    @Output() click: EventEmitter<string> = new EventEmitter<string>();

    @Input() text: string = DefaultConfigComponent.button.text;
    @Input() type: string = TypeButtonEnum.SUBMIT;
    @Input() class: string;

    onClickSubmit: Function;

    subscription: Subscription;
    isLoading: boolean = false;
    icon: string;
    iconPosition: ButtonIconPositon;

    constructor(private loadingService: LoadingService) {
        this.subscription = this.loadingService.subject.subscribe((isLoading: boolean) => {
            this.isLoading = isLoading
        })
    }

    @Input()
    set config(config: ButtonComponentInputs) {
        if (!config) return;

        this.text = config.text;
        this.icon = config.icon;
        this.iconPosition = config.iconPosition;
        this.type = config.type;
        this.onClickSubmit = config.onClickSubmit;
    }

    ngOnInit() {
        this.callback.emit(this.text);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    onClick() {
        if (this.type === TypeButtonEnum.SUBMIT && this.onClickSubmit) {
            this.onClickSubmit()
        } else if (this.type === TypeButtonEnum.BUTTON && this.onClickSubmit) {
            this.click.emit()
        }
    }
}
