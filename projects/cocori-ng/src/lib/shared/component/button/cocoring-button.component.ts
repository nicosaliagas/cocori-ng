import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { configdefault } from '../../../config/config.components';
import { ButtonComponentInputs, TypeButtonEnum } from '../../../core/model/component-inputs.model';
import { LoadingService } from '../../../core/service/loading.service';

@Component({
    selector: 'cocoring-button',
    templateUrl: 'cocoring-button.component.html',
    styleUrls: ['./cocoring-button.component.scss']
})
export class CocoringButtonComponent implements OnInit, OnDestroy {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    @Input() text: string = configdefault.button.text;
    @Input() type: string = TypeButtonEnum.SUBMIT;
    @Input() class: string;

    onClickSubmit: Function;

    subscription: Subscription;
    isLoading: boolean = false;

    constructor(private loadingService: LoadingService) {
        this.subscription = this.loadingService.subject.subscribe((isLoading: boolean) => {
            this.isLoading = isLoading
        })
    }

    @Input()
    set config(config: ButtonComponentInputs) {
        if (!config) return;

        this.text = config.text;
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
        if (this.type === TypeButtonEnum.SUBMIT && this.onClickSubmit) this.onClickSubmit()
    }
}
