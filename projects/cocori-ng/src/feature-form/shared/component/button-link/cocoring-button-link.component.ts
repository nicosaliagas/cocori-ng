import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponentInputs, TypeButtonEnum } from 'cocori-ng/src/feature-core';

@Component({
    selector: 'cocoring-button-link',
    templateUrl: 'cocoring-button-link.component.html',
    styleUrls: ['./cocoring-button-link.component.scss']
})
export class CocoringButtonLinkComponent implements OnInit, OnDestroy {
    public btnConfig: ButtonComponentInputs
    public url: string = '/bo/home'
    public openNewTab: boolean = false

    /** Mettre les bons Inputs de base comme ceux utilisé dans le projet atlantX */

    constructor() { }

    @Input()
    set config(config: ButtonComponentInputs) {
        if (!config) return;

        config.type = TypeButtonEnum.BUTTON;

        this.url = config.url
        this.openNewTab = config.openNewTab || false
        this.btnConfig = config
    }

    ngOnInit() { }

    ngOnDestroy(): void { }
}
