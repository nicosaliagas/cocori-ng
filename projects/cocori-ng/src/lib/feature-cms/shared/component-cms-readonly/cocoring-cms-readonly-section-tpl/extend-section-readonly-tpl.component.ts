import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';

import { SectionPageDatasModel } from '../../../core/model/adapter-cms.model';
import { ExtendPreviewActionsComponent } from '../../extend-preview-actions.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'extend-section-ro-tpl',
    template: '',
    host: { 'class': 'input-form' },
})

export abstract class ExtendSectionReadonlyTplComponent extends ExtendPreviewActionsComponent {
    @Input() section: SectionPageDatasModel

    public cdr: any;

    nbEditorView: number
    readOnly: boolean = true;
    value: any;
    uploadProgress: number;
    isUploading: boolean;

    constructor(injector: Injector) {
        super(injector);
    }

    init(nbEditorView: number) {
        this.nbEditorView = nbEditorView
        this.getValuesEditor();
    }

    private getValuesEditor() {
        this.value = this.section.values
    }

    openBottomSheet() { }

    removeBackground(event, nameControl) { }
}
