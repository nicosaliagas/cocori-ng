import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';

import { SectionPageDatasModel } from '../../../core/model/adapter-cms.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'extend-section-ro-tpl',
    template: '',
    host: { 'class': 'input-form' },
})

export abstract class ExtendSectionReadonlyTplComponent implements OnDestroy {
    @Input() section: SectionPageDatasModel

    nbEditorView: number
    readOnly: boolean = true;
    value: any;
    orientation: string = 'row'
    flexWidth: string
    orientationWidth: string = '100%';

    constructor() { }

    ngOnDestroy() { }

    init(nbEditorView: number) {
        this.nbEditorView = nbEditorView

        this.getValuesEditor();
    }

    private getValuesEditor() {
        this.value = this.section.values
    }

    openBottomSheet() {
        return ;
    }
}
