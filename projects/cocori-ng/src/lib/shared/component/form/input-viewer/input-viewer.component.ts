import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'input-viewer-ng',
    templateUrl: 'input-viewer.component.html',
})

export class InputViewerComponent implements OnInit {
    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    nameLabel: string;
    formGroup: FormGroup;
    subFormGroup: FormGroup;

    @Input()
    set config(config: any) {

        console.log("config...");

        this.nameLabel = config.nameLabel;
        this.subFormGroup = config.nameControl;
        this.formGroup = config.formGroup;
    }

    constructor() {
    }

    ngOnInit() {
    }
}
