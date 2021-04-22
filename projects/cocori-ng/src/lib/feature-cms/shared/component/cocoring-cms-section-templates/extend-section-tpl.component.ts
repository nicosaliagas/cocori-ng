import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfigWysiwygModel, InitWysiwyg } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BottomSheetSectionActions, SectionModel, WysiwygSectionCmsModel } from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';
import { CocoringCmsSectionActionsComponent } from '../cocoring-cms-section-actions/cocoring-cms-section-actions.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'extend-section-tpl',
    template: '',
    host: { 'class': 'input-form' }
})

export abstract class ExtendSectionTplComponent implements OnDestroy {
    @Input() section: SectionModel
    @Input() wysiwyg: WysiwygSectionCmsModel

    private subscriptions: Subscription = new Subscription();
    private fb: FormBuilder;
    private _bottomSheet: MatBottomSheet;
    private cdr: any;
    private cmsService: CmsService;

    formulaire: FormGroup
    nameControl: string = 'editorInline' // #todo: mettre un id ou un FormArray

    _configInline: ConfigWysiwygModel;
    subscription: Subscription = new Subscription();
    readOnly: boolean = true;
    value: any;

    constructor(injector: Injector) {
        this.fb = injector.get(FormBuilder);
        this._bottomSheet = injector.get(MatBottomSheet);
        this.cdr = injector.get(ChangeDetectorRef);
        this.cmsService = injector.get(CmsService);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    init() {
        this.formulaire = this.fb.group({});

        this.formulaire.addControl(this.nameControl, new FormControl(null))

        console.log("datas section", this.section)
        console.log("datas wysiwyg 😎 ", this.wysiwyg)

        this._configInline = this.initConfigComponent(true)

        this.initSectionValue()

        this.catalogBlocksOpenedEvent()

        this.pageContentSavedEvent()
    }

    private initSectionValue() {
        const blockContent: any = this.section.block.data.content.texte
        const sectionValue: any = this.section.values[0]

        this.value = sectionValue || blockContent

        this.formulaire.get(this.nameControl).setValue(this.value)
    }

    private initConfigComponent(inline: boolean) {
        let config = {
            apiFile: this.wysiwyg.apiFile,
            apiFileDownload: this.wysiwyg.apiFileDownload,
            apiKey: this.wysiwyg.apiKey,
            params: <InitWysiwyg>{
                inline: inline
            },
            nameLabel: '',
            formGroup: this.formulaire,
            nameControl: this.nameControl,
            validators: []
        }

        return config
    }

    private catalogBlocksOpenedEvent() {
        this.subscription.add(
            this.cmsService.catalogBlocksOpened$.pipe(
                tap((isOpened: boolean) => {
                    this.readOnly = isOpened

                    if (isOpened && this.formulaire.get(this.nameControl)) {
                        this.value = this.formulaire.get(this.nameControl).value
                    }
                }),
                tap(_ => this.cdr.detectChanges())
            ).subscribe()
        )
    }

    private pageContentSavedEvent() {
        this.subscription.add(
            this.cmsService.onContentPageSaved().pipe(
                tap(_ => console.log(`Save section ${this.section.idSection} : ${this.formulaire.get(this.nameControl).value}`)),
            ).subscribe()
        )
    }

    openBottomSheet() {
        if (!this.readOnly) return;

        const bottomSheet = this._bottomSheet.open(CocoringCmsSectionActionsComponent, {
            panelClass: 'bottom-sheet-container',
            data: <any>{
                idSection: this.section.idSection,
            }
        });

        bottomSheet.afterDismissed().subscribe((action: BottomSheetSectionActions) => {
            console.log("return bottom sheet", action)

            switch (action) {
                case 'remove':
                    this.cmsService.removeSection(this.section.idSection)

                    break;

                case 'duplicate':
                    this.saveSectionValue()

                    this.cmsService.duplicateSection(this.section)

                    break;

                default:
                    break;
            }
        });
    }

    private saveSectionValue() {
        const value = this.formulaire.get(this.nameControl).value

        this.section.values[0] = value
    }


}
